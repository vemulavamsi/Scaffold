pipeline {
    agent any
      environment {
        // Define AWS credentials for authentication
        AWS_ACCESS_KEY_ID     = credentials('AKIA5WBTPYA3PXZX336O')
        AWS_SECRET_ACCESS_KEY = credentials('cJl+5Xgz9LCxnSpCMUEFPP2yh290FTULKLBhW0A2')
        AWS_REGION            = 'us-east-1'
        LOG_GROUP_NAME        = 'practice'
       // LOG_STREAM_NAME       = 'your-cloudwatch-log-stream-name'
    }
    stages {
        stage('logs') {
            steps {
                script {
                    // cloudWatchLog(
                    //     logGroupName: 'practice',
                    //     region: 'us-east-1'
                    // ) {
                        stage('Build') {    
                            steps {
                                echo "Building the code"
                            }
                        }
                        stage('Publish to CloudWatch Logs') {
            steps {
                script {
                    // Configure AWS CLI with provided credentials
                    sh "aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID"
                    sh "aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY"
                    sh "aws configure set region $AWS_REGION"

                    // Publish logs to CloudWatch
                    sh "echo 'Hello, CloudWatch Logs!' | aws logs create-log-stream --log-group-name $LOG_GROUP_NAME"
                }
            }
        }
                        stage('Push Docker image to ECR') {
                            steps {
                                script {
                                    sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 940705824822.dkr.ecr.us-east-1.amazonaws.com"
                                    sh "docker build -t automationecr ."
                                    sh "docker tag automationecr:latest 940705824822.dkr.ecr.us-east-1.amazonaws.com/automationecr:latest"
                                    sh "docker push 940705824822.dkr.ecr.us-east-1.amazonaws.com/automationecr:latest"
                                }
                            }
                        }
                        
                        stage('Pull Docker image from ECR') {
                            steps {
                                script {
                                    sh "docker pull 940705824822.dkr.ecr.us-east-1.amazonaws.com/automationecr:latest"
                                    sh 'docker ps -f name=vamsi-Adi-practice -q | xargs --no-run-if-empty docker container stop'
                                    sh 'docker container ls -a -fname=vamsi-Adi-practice -q | xargs -r docker container rm'
                                    sh "docker run -d -p 3000:3000 --name vamsi-Adi-practice --log-driver=awslogs --log-opt awslogs-region=us-east-1 --log-opt awslogs-group=practice 933794111312.dkr.ecr.us-east-1.amazonaws.com/automationecr:latest"
                                }
                            }
                        }
                    }
                }
            }
        }
    }

