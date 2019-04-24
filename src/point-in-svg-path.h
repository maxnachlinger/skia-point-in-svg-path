#include <napi.h>

namespace pathsAndIntersectingPoints {
    Napi::Array getPointsAndIntersectingPaths(const Napi::CallbackInfo& info);

    Napi::Object Init(Napi::Env env, Napi::Object exports);
}
