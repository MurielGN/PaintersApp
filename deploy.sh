#!/bin/bash

mkdir toUpload
cp cloudformation-yaml/templates/* toUpload
echo "Nombre del bucket a crear?"
read bucket
echo "Nombre del rol para las lambdas"
read role_name

account_id=$(aws sts get-caller-identity --query "Account" --output text)

role_arn="arn:aws:iam::${account_id}:role\/${role_name}"

cp deployall.yaml deployall-packaged.yaml

linea=$(grep -n 'bucket_name' deployall.yaml | cut -d ':' -f1)
sed -i " ${linea} s/.*/    Default: \'${bucket}\' /" deployall-packaged.yaml
linea2=$(grep -n 'role_arn' deployall.yaml | cut -d ':' -f1)
sed -i " ${linea2} s/.*/    Default: \'${role_arn}\' /" deployall-packaged.yaml

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

  aws cloudformation deploy \
    --template-file deployall-packaged.yaml \
    --stack-name PaintersApp \
    --capabilities CAPABILITY_IAM

rm deployall-packaged.yaml
