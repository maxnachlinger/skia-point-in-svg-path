#include <napi.h>
#include "point-in-svg-path.h"

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
  return pointInSvgPath::Init(env, exports);
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, InitAll)
