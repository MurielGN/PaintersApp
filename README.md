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

1. Go to the deploy directory
   ```sh
   cd deploy
   ```
3. Create a s3 bucket
    ```sh
    aws s3 mb s3://example-bucket-name --region eu-west-1
    ```
4. Run aws cloudformation package
    ```sh
   aws cloudformation package \
      --template-file infrastructure.template \
      --s3-bucket example-bucket-name \
      --s3-prefix cfn-workshop-package-deploy \
      --output-template-file infrastructure-packaged.template
   ```
5. Validate the template file
    ```sh
    aws cloudformation validate-template \
        --template-body file://infrastructure-packaged.template
    ```
6. Deploy the package template
    ```sh
    aws cloudformation deploy \
      --template-file infrastructure-packaged.template \
      --stack-name example-stack-name \
      --region eu-west-1 \
      --capabilities CAPABILITY_IAM
    ```
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- SWAGGER EXAMPLES -->
## Swagger

You can load the swagger/swagger-file.yaml into https://editor.swagger.io/ to see the documentation of the API

[swagger-file.yaml](https://github.com/MurielGN/PaintersApp/blob/main/swagger/swagger-file.yaml)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- POSTMAN EXAMPLES -->
## POSTMAN

To test the API you can import postman/postman-file.json into your Postman App to import the postman collection and test the API

[postman-file.json](https://github.com/MurielGN/PaintersApp/blob/main/postman/postman-file.json)

<p align="right">(<a href="#top">back to top</a>)</p>
