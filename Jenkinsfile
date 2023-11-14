pipeline {
    agent any
     
    stages {
        stage('logs') {
            steps {
                script {
                    cloudWatchLog(
                        logGroupName: 'practice',
                        region: 'us-east-1'
                    ) {
                        stage('Build') {    
                            steps {
                                echo "Building the code"
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
}
