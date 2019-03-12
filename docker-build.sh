#!/usr/bin/env bash

docker rm $(docker ps -a -q)
docker rmi $(docker images -q)

docker build --tag=ubuntudev -f ./docker/Ubuntu .

id=$(docker create ubuntudev)
rm -rf include
docker cp $id:/include ./include

docker rm -v $id
