# aws_lambda
This projects holds the code and infra for a basic AWS Lambda
Minor change


* Have an active IAM user with programmtic acces ACCESS_KEY_ID and ACCESS_KEY_SECRET ()https://docs.aws.amazon.com/cli/latest/userguide/getting-started-prereqs.html#getting-started-prereqs-iam
* Have installed aws cli v2 (https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
* Configure the AWS prfile locally (https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html#getting-started-quickstart-new)

* Install CDK
In this case it depends if we want to use a python virtualenv or directly install the library with npm globally
doing it globally let's update node and npm to latest versions
npm: npm install npm@latest -g (8.19.2) latest tried
node: npm install -g n && n stable (16.17.1)

After that, then install CDK globally
cdk: npm install -g aws-cdk (2.43.1)

Once cdk is installed globally, at project root level we need to install cdk lib
cdk-lib: npm install aws-cdk-lib


withing project root folder we create a new npm project running
npm init, that will create a package json file or you can generate it manually

the run npm ci to do a clean install of the resources
After that then we need to create the cdk project running the next command
**NOTE: Dir must be empty, so this should be the very first step or you can just create all the files manually**
cdk init
Once the cdk project is created, customize it according to the specific needs




