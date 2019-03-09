#!/usr/bin/env bash

# setup Linux build environment
docker build --tag=ubuntudev -f ./docker/Dockerfile .
# start up bash on the image
docker run -it ubuntudev /bin/bash
# run this on the container
./data/build-skia.sh

