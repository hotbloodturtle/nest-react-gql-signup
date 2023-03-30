#!/bin/bash
docker build -t myproj . -f Dockerfile
docker run --rm -it -p 80:8000 -e DATABASE_HOST=host.docker.internal myproj