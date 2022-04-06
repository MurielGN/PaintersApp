<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/MurielGN/PaintersApp">
    <img src="https://gravity.es/wp-content/uploads/2021/08/logo-blue.svg" alt="Logo" width="150" height="150">
  </a>

  <h3 align="center">Painters App</h3>

  <p align="center">
    Application to calculate painting budgets!
    <br />
    <br />
    <a href="https://github.com/MurielGN/PaintersApp/issues">Report Bug</a>
    ·
    <a href="https://github.com/MurielGN/PaintersApp/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#Deploy">Deploy</a></li>
        <li><a href="#Modular deployment">Modular deployment</a></li>
      </ul>
    </li>
    <li><a href="#Swagger">Swagger</a></li>
    <li><a href="#POSTMAN">Postman</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

An application that facilitates the calculation of budgets for a painting company. The deployment will be done with CloudFormation and serverless framework

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

For this application we used the following:

* [API Gateway](https://aws.amazon.com/es/api-gateway/)
* [DynamoDB](https://aws.amazon.com/es/dynamodb/)
* [Lambda](https://aws.amazon.com/es/lambda/)
* [CloudFormation](https://aws.amazon.com/es/cloudformation/)

Lambdas are built in:
* [Node.js](https://nodejs.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

To deploy the application you will need the AWS CLI installed

* AWS CLI
  ```sh
  sudo apt-get install awscli
  ```

### Installation

Installation guide

1. Clone the repo
   ```sh
   git clone https://github.com/MurielGN/PaintersApp.git
   ```


<p align="right">(<a href="#top">back to top</a>)</p>

### Deploy

1. run the deploy script with
   ```sh
   sh deployall.sh
   ```
2. Introduce a bucket name to upload all the resources
3. Introduce the role name you want for your lambda functions
### Modular deployment

  #### DynamoDB Tables
1. Go to cloudformation-yaml directory
   ```sh
   cd cloudformation-yaml
   ```

2. In the dynamodb-template.yml file change the BucketS3 Parameter with your bucket name

      Before

      ```yaml
        BucketS3:
        Type: String
        Default: 'bucket-name'
      ```
      
      After

      ```yaml
        BucketS3:
        Type: String
        Default: 'painterapp'
      ```

3. Deploy the package template
    ```sh
      aws cloudformation deploy \
        --template-file dynamodb-template.yml \
        --stack-name DynamoDBTables \
        --capabilities CAPABILITY_IAM
    ```
  
  #### Lambda Functions

1. Go to cloudformation-yaml directory
   ```sh
   cd cloudformation-yaml
   ```

2. In the lambda-template.yml file change the BucketS3 Parameter with your bucket name

      Before

      ```yaml
        BucketS3:
        Type: String
        Default: 'bucket-name'
      ```
      
      After

      ```yaml
        BucketS3:
        Type: String
        Default: 'painterapp'
      ```

3. In the lambda-template.yml file change the LambdaRoleARN Parameter with the arn of the role you want to use

      Before

      ```yaml
        LambdaRoleARN:
        Type: String
        Default: 'role-arn'
      ```
      
      After

      ```yaml
        LambdaRoleARN:
        Type: String
        Default: 'arn:aws:iam::147023161607:role/LabRole'
      ```

4. Deploy the package template
    ```sh
      aws cloudformation deploy \
        --template-file lambda-template.yml \
        --stack-name LambdaFunctions \
        --capabilities CAPABILITY_IAM
    ```

  #### ApiGateway

1. Go to cloudformation-yaml directory
   ```sh
   cd cloudformation-yaml
   ```

2. Deploy the package template
    ```sh
      aws cloudformation deploy \
        --template-file apigateway-template.yml \
        --stack-name ApiGateway \
        --capabilities CAPABILITY_IAM
    ```
  
  #### Deploy with Serverless Framework [here](https://github.com/MurielGN/PaintersApp/tree/main/serverless-yaml)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- SWAGGER EXAMPLES -->
## Swagger

You can load the swagger/swagger-file.yaml into https://editor.swagger.io/ to see the documentation of the API

[swagger-file.yaml](https://github.com/MurielGN/PaintersApp/blob/main/Api-Documentation/swagger_v6.yaml)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- POSTMAN EXAMPLES -->
## POSTMAN

To test the API you can import postman/postman-file.json into your Postman App to import the postman collection and test the API

[postman-file.json](https://github.com/MurielGN/PaintersApp/blob/main/Api-Documentation/postman_collection.json)

<p align="right">(<a href="#top">back to top</a>)</p>
