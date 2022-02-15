#!/bin/bash

docker build -t romainlavabre/free-commit-frontend:"$1" -t romainlavabre/free-commit-frontend:latest -f ./docker/live/Dockerfile .

#docker login

#docker push romainlavabre/free-commit-frontend:"$1"
#docker push romainlavabre/free-commit-frontend:latest

#git tag -a "$1" -m "$1" && git push --tags
