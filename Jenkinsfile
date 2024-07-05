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
                dir('frontend') {
                    sh 'npm install'
                    // Remove 'npm run build' as we will run the development server
                }
            }
        }
        
        stage('Deploy Frontend') {
            steps {
                dir('frontend') {
                    // Start the React development server in the background
                    sh 'nohup npm start &'
                }
            }
        }
        
    }
}