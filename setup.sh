#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd $SCRIPT_DIR/common
npx tsc -w &

cd $SCRIPT_DIR/docker
docker-compose up -d

cd $SCRIPT_DIR/server
npx tsc -w &

trap "trap - SIGTERM && cd $SCRIPT_DIR/docker && docker-compose down && kill -- -$$" SIGINT SIGTERM EXIT

wait
