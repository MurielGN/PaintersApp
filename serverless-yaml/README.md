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





<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS'
description: 'This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework Node HTTP API on AWS

This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.

This template does not include any kind of persistence (database). For more advanced examples, check out the [serverless/examples repository](https://github.com/serverless/examples/) which includes Typescript, Mongo, DynamoDB and other examples.

## Usage

### Deployment

```
$ serverless deploy
```

After deploying, you should see output similar to:

```bash
Deploying aws-node-http-api-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-http-api-project-dev (152s)

endpoint: GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  hello: aws-node-http-api-project-dev-hello (1.9 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [http event docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
```

Which should result in response similar to the following (removed `input` content for brevity):

```json
{
  "message": "Go Serverless v2.0! Your function executed successfully!",
  "input": {
    ...
  }
}
```

### Local development

You can deploy all infraestructure on locally:

  1. Install plugin offline:
    ``` npm install serverless-offline --save-dev```

  2. Install plugin dynamodb local:
    ``` npm install --save serverless-dynamodb-local```
    Install DynamoDB Local ```sls dynamodb install```
  
  3. Deploy locally for testing:
    ``` serverless offline start ```
