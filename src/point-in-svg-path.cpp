#include <string>
#include <vector>
#include <iostream>
#include "point-in-svg-path.h"
#include "SkPath.h"
#include "SkParsePath.h"

struct Path
{
    std::string id;
    SkPath skPath;
};

Napi::Array pointInSvgPath::getPathsContainingPoints(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 2) {
        Napi::TypeError::New(env, "Expected an array of paths and an array of points")
        .ThrowAsJavaScriptException();
    }

    // read paths, create Skia paths
    Napi::Array pathsInput = info[0].As<Napi::Array>();
    unsigned int pathsInputLength = pathsInput.Length();

    std::vector<Path> paths;
    paths.reserve(pathsInput.Length());

    unsigned int i;
    Napi::Object obj;
    std::string data;
    Path path;

    for (i = 0; i < pathsInputLength; i++) {
        obj = pathsInput.Get(i).ToObject();

        path = Path();
        path.id = obj.Get("id").ToString();

        data = obj.Get("data").ToString();
        SkParsePath::FromSVGString(data.c_str(), &path.skPath);

        paths.push_back(path);
    }

    Napi::Array pointsInput = info[1].As<Napi::Array>();
    unsigned int pointsInputLength = pointsInput.Length();

    double x, y;
    Napi::Object result;
    int intersectingPathIdsSize, j;
    std::vector<std::string> intersectingPathIds;
    Napi::Array intersectingPathIdsArr;
    Napi::Array results = Napi::Array::New(env, pointsInputLength);

    for (i = 0; i < pointsInputLength; i++) {
        obj = pointsInput.Get(i).ToObject();
        x = obj.Get("x").ToNumber().DoubleValue();
        y = obj.Get("y").ToNumber().DoubleValue();

        result = Napi::Object::New(env);
        result.Set("pointId", obj.Get("id").ToString());
        result.Set("x", x);
        result.Set("y", y);

        intersectingPathIds.clear();

        // find paths which contain x,y
        for (Path _path : paths) {
            if (_path.skPath.contains(x, y)) {
                intersectingPathIds.push_back(_path.id);
            }
        }

        // intersectingPathIds vector -> napi array
        intersectingPathIdsSize = intersectingPathIds.size();
        intersectingPathIdsArr = Napi::Array::New(env, intersectingPathIds.size());

        for (j = 0; j < intersectingPathIdsSize; j++) {
            intersectingPathIdsArr[j] = intersectingPathIds[j];
        }

        result.Set("intersectingPathIds", intersectingPathIdsArr);

        results[i] = result;
    }

    return results;
}

Napi::Object pointInSvgPath::Init(Napi::Env env, Napi::Object exports) {
    exports.Set("getPathsContainingPoints", Napi::Function::New(env, pointInSvgPath::getPathsContainingPoints));
    return exports;
}
