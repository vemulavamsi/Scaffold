pipeline {
     agent any
  
    stages{
       stage('Check Env Variable') {
            steps {
                script {
                        buildProps = readProperties file: 'build.properties'
                echo "${buildProps.BRANCH_NAME}"
                echo "${buildProps.CRED}"
                echo "${buildProps.git_url}"
                echo "${buildProps.AWS_ACCOUNT_ID}"
                }
              }
          }
       stage ('cloneing'){
        steps {
               script{
                    // git branch: buildProps.BRANCH_NAME, credentialsId: buildProps.CRED, url: buildProps.git_url
                    git branch: 'main', credentialsId: 'GIT', url: 'https://github.com/vemulavamsi/Scaffold.git'
                }
            }
       }
        stage('Push Docker image to ECR') {
            steps {
                script{
                   // sh "aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/g8i9m6o6"
                    sh "sudo aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/g8i9m6o6"
                    sh "sudo docker build -t learning111 ."

                    sh "sudo docker tag learning111:latest public.ecr.aws/g8i9m6o6/learning111:latest"

                    sh "sudo docker push public.ecr.aws/g8i9m6o6/learning111:latest"
                }
        }
    }

//         stage('Pull Docker image from ECR') {
//             steps {
//             withAWS(credentials: 'aws-credentials', region: 'us-east-1') {
//             sh "docker pull ${buildProps.AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/node-repo:${env.BUILD_NUMBER}"
//             sh "docker rm -f learning111"
//             sh "docker run -itd -p 3000:3000 --name learning111 ${buildProps.AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/node-repo:${env.BUILD_NUMBER}"

//         }
//     }
// }
         }
}



/*
pipeline {
    agent any 
        environment {
            AWS_ACCOUNT_ID="070067762024"
            AWS_DEFAULT_REGION="us-east-1" 
            IMAGE_REPO_NAME="learning111"  //ecr repo name
            IMAGE_TAG=     "latest"
            REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"   
        } 
        stages {
            stage("Logging into AWS ECR") {
                steps {
                    sh "aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/g8i9m6o6"
                }
            }
            stage("Build the docker image"){
                steps {
                    sh "docker build -t ${IMAGE_REPO_NAME} ."
                }
            }
            stage("Pushing to ECR") {
                steps {

                    sh "docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:$IMAGE_TAG"
                    sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}"
                    sh "docker run -d -p 80:80  ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}"
                }
            }
        }
    
}
*/



