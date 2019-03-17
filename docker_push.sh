#!/bin/bash
#echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
#docker push mufdvr/github_interface
docker save mufdvr/github_interface | bzip2 | ssh mika@staging.cityparkvip.ru 'bunzip2 | docker load'