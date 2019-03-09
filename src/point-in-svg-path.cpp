#include "point-in-svg-path.h"
#include "SkPath.h"
#include "SkParsePath.h"

bool pointInSvgPath::contains(std::string pathDataStr, float x, float y) {
    SkPath path;
    SkParsePath::FromSVGString(pathDataStr.c_str(), &path);
    return path.contains(x, y);
}

Napi::Boolean pointInSvgPath::ContainsWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 3 || !info[0].IsString() || !info[1].IsNumber() || !info[2].IsNumber()) {
        Napi::TypeError::New(env, "Path data string and an x and y coordinates expected")
        .ThrowAsJavaScriptException();
    }

    Napi::String pathDataStr = info[0].As<Napi::String>();
    Napi::Number x = info[1].As<Napi::Number>();
    Napi::Number y = info[2].As<Napi::Number>();

    bool returnValue = pointInSvgPath::contains(pathDataStr, x.FloatValue(), y.FloatValue());

    return Napi::Boolean::New(env, returnValue);
}

Napi::Object pointInSvgPath::Init(Napi::Env env, Napi::Object exports) {
    exports.Set("contains", Napi::Function::New(env, pointInSvgPath::ContainsWrapped));
    return exports;
}
