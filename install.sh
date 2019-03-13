#!/usr/bin/env bash

tar -xvzf include.tar.gz > /dev/null 2>&1

if [[ "$OSTYPE" == "darwin"* ]]; then
  tar -xvzf mac.tar.gz > /dev/null 2>&1
else
  tar -xvzf linux.tar.gz > /dev/null 2>&1
fi
