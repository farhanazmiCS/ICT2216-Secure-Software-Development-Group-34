pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }
    environment {
        GITHUB_CREDENTIALS = credentials('access-token')
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/farhanazmiCS/ICT2216-Secure-Software-Development-Group-34.git', branch: 'main', credentialsId: "${GITHUB_CREDENTIALS}"
            }
        }
        stage('Build Frontend') {
            steps {
                dir('client') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Build Backend') {
            steps {
                dir('') {
                    sh 'npm install'
                }
            }
        }
        stage('Deploy') {
            steps {
                dir('') {
                    sh 'npm start'
                }
            }
        }
    }
}
