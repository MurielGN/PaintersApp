#!/bin/bash

mkdir toUpload

for file in $(ls ./src)
do
name=$(echo "$file" | cut -f 1 -d '.')
echo "Zipping ${file}"
zip toUpload/$name src/$file
done
