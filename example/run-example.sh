#!/usr/bin/env bash

[ -d input-small.json ] || tar -xvzf input-small.tar.gz > /dev/null 2>&1
node index.js
