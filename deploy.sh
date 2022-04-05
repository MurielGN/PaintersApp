#!/bin/bash

mkdir toUpload

for file in $(ls ./src)
do
echo "Zipping ${file}"
zip toUpload/"${file/.js/}".zip $file
done
