#!/bin/bash

mkdir toUpload
cp cloudformation-yaml/* toUpload
echo "Nombre del bucket a crear?"
read bucket

aws s3 mb s3://$bucket

for file in $(ls ./src)
do
name=$(echo "$file" | cut -f 1 -d '.')
echo "Zipping ${file}"
cd ./src
mv $file index.js
zip ../toUpload/$name index.js
mv index.js $file
cd ..
done
aws s3 sync ./toUpload s3://$bucket

rm -R toUpload
