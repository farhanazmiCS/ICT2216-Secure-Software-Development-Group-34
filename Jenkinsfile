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
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'python3 -m venv venv'
                    sh './venv/bin/pip install -r requirements.txt'
                    sh './venv/bin/python manage.py migrate'
                    sh './venv/bin/python manage.py collectstatic --noinput'
                }
            }
        }
        stage('Deploy Frontend') {
            steps {
                dir('frontend') {
                    sh 'cp -r build/* /var/www/html/'
                }
            }
        }
        stage('Deploy Backend') {
            steps {
                dir('backend') {
                    sh 'cp -r * /var/www/django_app/'
                    sh 'gunicorn --workers 3 your_django_project.wsgi:application --bind unix:/var/www/django_app/gunicorn.sock'
                }
            }
        }
    }
}
