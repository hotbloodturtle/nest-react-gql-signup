#!/bin/bash
docker build -t sixthree-moneybook . -f Dockerfile
docker run --rm -it -p 80:8000 -e DATABASE_HOST=host.docker.internal sixthree-moneybook