#include <napi.h>

namespace pointInSvgPath {
    Napi::Array getPathsContainingPoints(const Napi::CallbackInfo& info);

    Napi::Object Init(Napi::Env env, Napi::Object exports);
}
