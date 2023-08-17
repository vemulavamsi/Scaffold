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
                    sh "git branch: 'main', credentialsId: 'GIT', url: 'https://github.com/vemulavamsi/Scaffold.git'"
                }
            }
       }
//         stage('Push Docker image to ECR') {
//             steps {
//             withAWS(credentials: 'aws-credentials', region: 'us-east-1') {
//             sh "aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/g8i9m6o6"
			   
//             sh "docker build -t learning111 ."

//             sh "docker tag learning111:latest public.ecr.aws/g8i9m6o6/learning111:latest"

//             sh "docker push public.ecr.aws/g8i9m6o6/learning111:latest"
//         }
//     }
// }

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

