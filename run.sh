#!/bin/sh

# Execute a single test on target environment.
#
# Usage: ./run.sh testFile.js
# See README file for environment variables settings

export RESULTS_DIR=$RESULTS_DIR || $(dirname $0)

if [[ -z "$RESULTS_DIR" ]]; then
  export RESULTS_DIR=.
fi


if [[ -z "$K6_BINARY" ]]; then
  K6_BINARY="k6"
fi

set -e

FILE=./local.env
if [ -f "$FILE" ]; then
    echo "$FILE exists."
  set -o allexport
  source $FILE
  set +o allexport
fi

TEST_FILE=$1

echo "Running $TEST_FILE"

mkdir -p $RESULTS_DIR/results/$(basename $(dirname $TEST_FILE))

$K6_BINARY run $TEST_FILE