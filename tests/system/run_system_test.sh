#!/bin/bash

echo 'Initial fetch'
/bin/bash ./system/fetch_all.sh ./data/fetch_0.json

echo 'Create (correctly)'
/bin/bash ./system/create.sh ./data/new_post.json ./data/fetch_after_create.json