#include <napi.h>

namespace pointInSvgPath {
    Napi::Object getPathsContainingPoints(const Napi::CallbackInfo& info);

    Napi::Object Init(Napi::Env env, Napi::Object exports);
}
