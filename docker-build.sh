#!/usr/bin/env bash

# if you want to clear al the docker things :)
#docker rm $(docker ps -a -q) --force
#docker rmi $(docker images -q) --force

docker build --tag=ubuntudev -f ./docker/Ubuntu .

rm -rf ./include
mkdir -p ./include/skia/out/Release

id=$(docker create ubuntudev)
docker cp $id:/.skia-build/skia/out/Release/libskia.a ./include/skia/out/Release

tar -czvf linux.tar.gz ./include

docker rm -v $id
