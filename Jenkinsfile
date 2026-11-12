pipeline {
    agent any

    environment {
        IMAGE_NAME = "cloud-command-center"
        CONTAINER_NAME = "cloud-command-container"
        APP_URL = "http://localhost:3002"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    sh "docker stop my-site-container devops-portfolio-container ${CONTAINER_NAME} || true"
                    sh "docker rm my-site-container devops-portfolio-container ${CONTAINER_NAME} || true"
                    sh "docker run -d -p 3002:3000 --name ${CONTAINER_NAME} ${IMAGE_NAME}"
                }
            }
        }

        stage('Open Application Locally') {
            steps {
                script {
                    sleep 2
                    sh '''
                        export DISPLAY=:0
                        export XAUTHORITY=/home/ayush.ranjan/.Xauthority
                        JENKINS_NODE_COOKIE=dontKillMe BUILD_ID=dontKillMe setsid sudo -u ayush.ranjan DISPLAY=:0 google-chrome http://localhost:3002 >/dev/null 2>&1 < /dev/null &
                    '''
                }
            }
        }
    }
}
