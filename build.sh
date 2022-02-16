#!/bin/bash

docker build -t romainlavabre/free-commit-client:"$1" -t romainlavabre/free-commit-client:latest -f ./docker/live/Dockerfile .

#docker login

#docker push romainlavabre/free-commit-client:"$1"
#docker push romainlavabre/free-commit-client:latest

#git tag -a "$1" -m "$1" && git push --tags
