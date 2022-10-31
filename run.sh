#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd $SCRIPT_DIR/common
npx tsc -w &

cd $SCRIPT_DIR/client
yarn start &

trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

wait