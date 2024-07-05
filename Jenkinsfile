pipeline {
    agent any
    tools {
        nodejs 'NodeJS' // Ensure NodeJS tool is configured in Jenkins
    }
    environment {
        GITHUB_CREDENTIALS = credentials('access-token') // Replace with your actual credentials ID
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
        
        stage('Deploy Frontend') {
            steps {
                dir('frontend') {
                    sh 'sudo cp -r build/* /var/www/html/'
                }
            }
        }
        
    }
}