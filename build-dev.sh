#!/bin/bash

docker build -t romainlavabre/free-commit-client:"$1" -f ./docker/live/Dockerfile .

docker push romainlavabre/free-commit-client:"$1"
