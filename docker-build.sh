#!/usr/bin/env bash

# if you want to clear al the docker things :)
#docker rm $(docker ps -a -q) --force
#docker rmi $(docker images -q) --force

docker build --tag=ubuntudev -f ./docker/Ubuntu .

id=$(docker create ubuntudev)
rm -rf ./include
mkdir ./include/skia/out/Release
docker cp $id:/.skia-build/skia/out/Release ./include/skia/out/Release

docker rm -v $id
