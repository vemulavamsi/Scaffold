pipeline {
     agent any
  
    stages {
        stage('Build') {    
            steps{
                echo "Building the code"
                //sh "git clone https://github.com/vemulavamsi/Scaffold.git"
                }
            }
        stage('Push Docker image to ECR') {
            steps {
                script{
                   // sh "docker rmi -f learning111"
                   // sh "aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/g8i9m6o6"
                   sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 933794111312.dkr.ecr.us-east-1.amazonaws.com"
                    sh "docker build -t automationecr ."
                    //sh "docker build -t learning111 ."
                    sh "docker tag automationecr:latest 933794111312.dkr.ecr.us-east-1.amazonaws.com/automationecr:latest"
                   // sh "docker tag learning111:latest public.ecr.aws/g8i9m6o6/learning111:latest"
                    sh "docker push 933794111312.dkr.ecr.us-east-1.amazonaws.com/automationecr:latest"
                    //sh "docker push public.ecr.aws/g8i9m6o6/learning111:latest"
                }
        }
    }
        stage('Pull Docker image from ECR') {
            steps {
                script{
                        // sh "docker pull ${buildProps.AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/node-repo:${env.BUILD_NUMBER}"
                        //sh "docker rm -f learning111"
                        // sh "docker run -itd -p 3000:3000 --name learning111 ${buildProps.AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/node-repo:${env.BUILD_NUMBER}"
                   // Removing existing image
                    sh "docker rmi -f automationecr"
                    // Pulling latest version of docker image
                    sh "docker pull 933794111312.dkr.ecr.us-east-1.amazonaws.com/automationecr:latest"
                    
                    sh 'docker ps -f name=vamsi-Adi-practice -q | xargs --no-run-if-empty docker container stop'

                    sh 'docker container ls -a -fname=vamsi-Adi-practice -q | xargs -r docker container rm'
                    // creating container and port mapping
                    
                   // sh "docker run -d --name vamsi-Adi-practice -p 3000:3000 public.ecr.aws/g8i9m6o6/learning111:latest" 
                    //logs
                    sh "docker run -d -p 3000:3000 --name vamsi-Adi-practice --log-driver=awslogs --log-opt awslogs-region=us-east-1 --log-opt awslogs-group=practice 933794111312.dkr.ecr.us-east-1.amazonaws.com/automationecr:latest"
                }
        }
    }
     stage('Sonar') {
            steps{
                //Sonar envirment setup
                script{
                    withSonarQubeEnv(credentialsId: 'Sonar') {
                        sh 'npm run sonar-scanner'
                    }
                    
                }
                
            }
        }

 }
}

/*
//permission jason to create logs it need to attach in Iam role
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
*/

