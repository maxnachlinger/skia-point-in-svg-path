#!/usr/bin/env bash

# build Skia -Skia doesn't support CMAKE - so we're stuck with a bash script :(

rm -rf ./.skia-build
mkdir ./.skia-build
cd ./.skia-build

git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
git clone https://skia.googlesource.com/skia.git

# build Skia - this takes awhile
export PATH="${PWD}/depot_tools:${PATH}"
cd skia

# a version I know works :)
git checkout 29d5dec9a0783a033b921dc483fb98d565d684f6

python tools/git-sync-deps

if [[ "$OSTYPE" == "darwin"* ]]; then
  gn gen out/Release --args="is_official_build=true is_debug=false skia_use_system_expat=false skia_use_system_icu=false skia_use_libjpeg_turbo=false skia_use_system_libpng=false skia_use_system_libwebp=false skia_use_system_zlib=false extra_cflags_cc=[\"-frtti\"]"
else
  gn gen out/Release --args="is_official_build=true is_debug=false skia_use_system_expat=false skia_use_system_icu=false skia_use_system_libjpeg_turbo=false skia_use_system_libpng=false skia_use_system_libwebp=false skia_use_system_zlib=false"
fi

ninja -C out/Release skia
cd ../../
