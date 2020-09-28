#!/bin/bash

fetch0=./data/fetch_initial.json
fetch1=./data/fetch_after_create.json
fetch2=./data/fetch_after_update.json
fetch3=./data/fetch_after_delete.json

fetch=$fetch0

echo 'Initial fetch'
/bin/bash ./system/fetch_all.sh $fetch

fetch=$fetch1

echo 'Create (correctly)'
/bin/bash ./system/create.sh ./data/new_post.json $fetch

echo 'Create (incorrectly, with id)'
/bin/bash ./system/create_with_id.sh ./data/new_post_with_id.json $fetch

fetch=$fetch2

echo 'Update (correctly)'
/bin/bash ./system/update.sh ./data/update_post_3.json $fetch 

echo 'Update (mismatch id)'
/bin/bash ./system/update_mismatched_id.sh ./data/update_post_3.json $fetch 

echo 'Update (unknown id)'
/bin/bash ./system/update_unknown_id.sh ./data/update_post_100.json $fetch 

fetch=$fetch3
