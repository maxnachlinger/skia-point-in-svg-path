#!/usr/bin/env bash

# create .skia-build and include
[ -d .skia-build ] || mkdir .skia-build
[ -d include ] || mkdir include

# Checkout Skia and depot_tools in .build
cd ./.skia-build
[ -d skia ] || git clone https://skia.googlesource.com/skia.git
rsync -a ./skia ../include > /dev/null 2>&1
cd ..

sh ./build-skia.sh

# we're not building Skia here - just extract the archive
#if [[ "$OSTYPE" == "darwin"* ]]; then
#  tar -xvzf skia-binaries-mac.tar.gz > /dev/null 2>&1
#else
#  # TODO - linux binaries
#fi
