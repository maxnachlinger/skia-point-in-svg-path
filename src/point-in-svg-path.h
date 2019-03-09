#include <napi.h>

namespace pointInSvgPath {

    bool contains(std::string pathData, float x, float y);
    Napi::Boolean ContainsWrapped(const Napi::CallbackInfo& info);

    Napi::Object Init(Napi::Env env, Napi::Object exports);

}
