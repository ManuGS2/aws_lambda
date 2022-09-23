const { Stack, Duration } = require('aws-cdk-lib');
const { Construct } = require('constructs');
const { RetentionDays } = require('aws-cdk-lib/aws-logs');

const lambda = require('aws-cdk-lib/aws-lambda');
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
    new lambda.DockerImageFunction(this, 'PythonLambda', {
      description: 'Simple Lambda written in Python',
      functionName: `${props.env.stackName}-python-lambda`,
      architecture: lambda.Architecture.X86_64,
      timeout: Duration.minutes(1),
      memorySize: 128,
      // role: externalResources.lambdaRole,
      // vpc: externalResources.appLambdaVpc,
      // securityGroups: externalResources.appLambdaSecurityGroups,
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, './../../python_lambda'), {
          exclude: ['Dockerfile'],
          file: './Dockerfile'
      }),
      environment: {
          REGION: props.env.region,
      },
      logRetention: RetentionDays.ONE_WEEK
  });

    // example resource
    // const queue = new sqs.Queue(this, 'AwsLambdaQueue', {
    //   visibilityTimeout: Duration.seconds(300)
    // });
  }
}

module.exports = { AwsLambdaStack }
