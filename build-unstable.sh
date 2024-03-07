#!/bin/bash

docker build -t romainlavabre/free-commit-client:unstable -f ./docker/live/Dockerfile .

docker push romainlavabre/free-commit-client:unstable

