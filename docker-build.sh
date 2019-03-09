#!/usr/bin/env bash

docker rm $(docker ps -a -q)
docker rmi $(docker images -q)

rm -rf ./include

docker build --tag=ubuntudev -f ./docker/Ubuntu .

id=$(docker create ubuntudev)
rm -rf include
docker cp $id:/include ./include

tar czf ubuntu.tar.gz ./include

docker rm -v $id


docker build --tag=centosdev -f ./docker/Centos .

id=$(docker create centosdev)
rm -rf include
docker cp $id:/include ./include

tar czf centos.tar.gz ./include

docker rm -v $id

# TODO - once centos build is done, create include dir and tar gz it
