#!/usr/bin/env bash

rm -rf ./include
mkdir ./include

# Checkout Skia and depot_tools in .build
cd ./include
git clone https://skia.googlesource.com/skia.git
cd skia
# a version I know works :)
git checkout 29d5dec9a0783a033b921dc483fb98d565d684f6

python tools/git-sync-deps
cd ../../
pwd

# we're not building Skia here - just extract the archive
if [[ "$OSTYPE" == "darwin"* ]]; then
  tar -xvzf mac.tar.gz > /dev/null 2>&1
else
  # TODO - additional linux checks and binaries
  tar -xvzf ubuntu.tar.gz > /dev/null 2>&1
fi
