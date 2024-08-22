import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import path = require("path");

export class AutoVerifyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Trigger
    const autoVerifyFn = new cdk.aws_lambda.Function(this, "autoVerifyFn", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_LATEST,
      handler: "index.handler",
      code: cdk.aws_lambda.Code.fromAsset(path.join(__dirname, "lambda")),
    });

    //Cognito
    const pool = new cdk.aws_cognito.UserPool(this, "myuserpool", {
      userPoolName: "auto-verify-userpool",
      selfSignUpEnabled: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      lambdaTriggers: {
        preSignUp: autoVerifyFn,
      },
    });

    //Client
    const client = pool.addClient("customer-app-client");
    const clientId = client.userPoolClientId;

    //Client ID
    new cdk.CfnOutput(this, "clientIDOutput", {
      key: "ClientId",
      value: clientId,
    });
  }
}
