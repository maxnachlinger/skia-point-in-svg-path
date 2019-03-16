#include <string>
#include <vector>
#include <iostream>
#include "point-in-svg-path.h"
#include "SkPath.h"
#include "SkParsePath.h"

//    struct Path
//    {
//        std::string data;
//        std::string id;
//        SkPath* skPath;
//    };
//
//    struct InternalPath : Path
//    {
//        SkPath* skPath;
//    };
//
//    struct Point
//    {
//        float x;
//        float y;
//    };
//
//    struct PathsContainingPointResult
//    {
//        Point point;
//        std::vector<std::string> paths;
//    };
//
//
//std::vector<PointWithPaths> _pointInSvgPath::getPathsContainingPoints(std::vector<Path> paths, std::vector<Point> points) {
//    std::vector<InternalPath> internalPaths;
//    internalPaths.reserve(paths.size());
//
//    for(Path path : paths)
//    {
//        InternalPath internalPath = InternalPath();
//        internalPath.data = path.data;
//        internalPath.id = path.id;
//        SkParsePath::FromSVGString(path.data.c_str(), &internalPath.skPath);
//
//        internalPaths.push_back(internalPath);
//    }
//
//    std::vector<PointWithPaths> result;
//    result.reserve(points.size());
//
//    for(Point point : points)
//    {
//        PointWithPaths pointWithPaths = PointWithPaths();
//        pointWithPaths.point = point;
//        pointWithPaths.paths = std::vector<Path>{};
//
//        for (InternalPath internalPath : internalPaths) {
//            if (internalPath.skPath.contains(point.x, point.y)) {
//                Path foundPath = Path();
//                foundPath.data = internalPath.data;
//                foundPath.id = internalPath.id;
//                pointWithPaths.paths.push_back(foundPath);
//            }
//        }
//
//        result.push_back(pointWithPaths);
//    }
//
//    return result;
//}

struct Path
{
    std::string id;
    SkPath skPath;
};

struct PathsContainingPointResult
{
    std::vector<std::string> idsContainingPoint;
};

Napi::Object pointInSvgPath::getPathsContainingPoints(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 2) {
        Napi::TypeError::New(env, "Expected an array of paths and an array of points")
        .ThrowAsJavaScriptException();
    }

    // read paths, create Skia paths
    Napi::Array pathsInput = info[0].As<Napi::Array>();
    unsigned int pathsInputLength = pathsInput.Length();

    std::vector<Path> idsAndSkiaPaths;
    idsAndSkiaPaths.reserve(pathsInput.Length());

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
        // std::cout << path.id << "," << data << std::endl;

        idsAndSkiaPaths.push_back(path);
    }

    Napi::Array pointsInput = info[1].As<Napi::Array>();
    unsigned int pointsInputLength = pointsInput.Length();

    float x, y;
    std::string id;

    for (i = 0; i < pointsInputLength; i++) {
        obj = pointsInput.Get(i).ToObject();
        id = obj.Get("id").ToString();
        x = obj.Get("x").ToNumber().FloatValue();
        y = obj.Get("y").ToNumber().FloatValue();
        std::cout << id << ": " << x << "," << y << std::endl;
    }

    return Napi::Array::New(env);
}

Napi::Object pointInSvgPath::Init(Napi::Env env, Napi::Object exports) {
    exports.Set("getPathsContainingPoints", Napi::Function::New(env, pointInSvgPath::getPathsContainingPoints));
    return exports;
}
