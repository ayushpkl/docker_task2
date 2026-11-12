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
                        USER_UID=$(id -u ayush.ranjan)
                        sudo -u ayush.ranjan DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$USER_UID/bus google-chrome http://localhost:3002 >/dev/null 2>&1 &
                    '''
                }
            }
        }
    }
}
