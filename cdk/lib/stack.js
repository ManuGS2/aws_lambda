const { Stack, Duration } = require('aws-cdk-lib');
const { Construct } = require('constructs');
const { RetentionDays } = require('aws-cdk-lib/aws-logs');
const { LambdaSubscription } = require('aws-cdk-lib/aws-sns-subscriptions')

const lambda = require('aws-cdk-lib/aws-lambda');
const sns = require('aws-cdk-lib/aws-sns');
const path = require('path');

class AwsLambdaStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const pythonLambda = new lambda.DockerImageFunction(this, 'PythonLambdaContainer', {
      description: 'Simple Lambda written in Python and deployed as a docker container',
      functionName: `${props.env.stackName}-python-lambda-container`,
      architecture: lambda.Architecture.X86_64,
      timeout: Duration.minutes(1),
      memorySize: 128,
      // role: externalResources.lambdaRole,
      // vpc: externalResources.appLambdaVpc,
      // securityGroups: externalResources.appLambdaSecurityGroups,
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, './../../python_lambda_container'), {
          exclude: ['Dockerfile'],
          file: './Dockerfile'
      }),
      environment: {
          REGION: props.env.region,
      },
      logRetention: RetentionDays.ONE_WEEK
    });
    
    const goLambdaZip = new lambda.Function(this, 'GoLambdaZip', {
      description: 'Simple Lambda written in Go and deployed as zip package',
      functionName: `${props.env.stackName}-go-lambda-zip`,
      architecture: lambda.Architecture.X86_64,
      timeout: Duration.minutes(1),
      memorySize: 128,
      runtime: lambda.Runtime.GO_1_X,
      code: lambda.Code.fromAsset(path.join(__dirname, './../../go_lambda_zip'), {
        bundling: {
          image: lambda.Runtime.GO_1_X.bundlingImage,
          user: "root",
          command: [
            'bash', '-c', 
            [
              'make build-vendor',
              'make build-lambda'
            ].join(' && ')
          ]
        }
      }),
      handler: 'bootstrap',
      environment: {
        REGION: props.env.region,
      },
      logRetention: RetentionDays.ONE_WEEK
    });

    // new lambda.DockerImageFunction(this, 'GoLambdaZip', {
    //   description: 'Simple lambda written in Golang and deployed as zip package',
    //   functionName: `${props.env.stackName}-go-lambda-zip`,
    //   architecture: lambda.Architecture.X86_64,
    //   timeout: Duration.minutes(1),
    //   memorySize: 128,
    //   // role: externalResources.lambdaRole,
    //   // vpc: externalResources.appLambdaVpc,
    //   // securityGroups: externalResources.appLambdaSecurityGroups,
    //   code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, './../../go_lambda_zip'), {
    //       exclude: ['Dockerfile'],
    //       file: './Dockerfile'
    //   }),
    //   environment: {
    //       REGION: props.env.region,
    //   },
    //   logRetention: RetentionDays.ONE_WEEK
    // });

    const myTopic = new sns.Topic(this, 'MyTopic', {
      topicName: 'custom-lambda-topic',
      displayName: 'This is a simple topic that will invoke multiple lambdas',
    });

    myTopic.addSubscription(new LambdaSubscription(pythonLambda))
    myTopic.addSubscription(new LambdaSubscription(goLambdaZip))
  }
}

module.exports = { AwsLambdaStack }
