#!/usr/bin/env bash

# build Skia -Skia doesn't support CMAKE - so we're stuck with a bash script :(

# create .skia-build and include
[ -d .skia-build ] || mkdir .skia-build
[ -d include ] || mkdir include

# Checkout Skia and depot_tools in .build
cd ./.skia-build
[ -d depot_tools ] || git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
[ -d skia ] || git clone https://skia.googlesource.com/skia.git

# build Skia - this takes awhile
export PATH="${PWD}/depot_tools:${PATH}"
cd skia
python tools/git-sync-deps
gn gen out/Release --args="is_official_build=true skia_use_system_expat=false skia_use_system_icu=false skia_use_libjpeg_turbo=false skia_use_system_libpng=false skia_use_system_libwebp=false skia_use_system_zlib=false skia_use_libwebp=false extra_cflags_cc=[\"-frtti\"]"
ninja -C out/Release skia

# copy Skia up
cd ..
rsync -a ./skia ../include > /dev/null 2>&1
cd ..
