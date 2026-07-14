pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                echo 'Building .NET backend...'
                dir('TestApiBackend') {
                    sh 'dotnet build'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Building React frontend...'
                dir('test-frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Database Check') {
            steps {
                echo 'Checking PostgreSQL connectivity...'
                sh 'PGPASSWORD=JenkinsCheck123 psql -h 172.31.34.237 -U postgres -c "SELECT 1;"'
            }
        }

        stage('Approval - Backup Reminder') {
            steps {
                echo 'Pausing for manual backup confirmation...'
                input message: 'Please back up the existing code on the server, then click Proceed to continue deployment.', ok: 'Proceed'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying new code live...'
                sshagent(credentials: ['app-server-ssh']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@172.31.34.237 "mkdir -p ~/deployed-frontend ~/deployed-backend"
                        scp -o StrictHostKeyChecking=no -r test-frontend/build/* ubuntu@172.31.34.237:~/deployed-frontend/
                        scp -o StrictHostKeyChecking=no -r TestApiBackend/bin/Debug/net8.0/* ubuntu@172.31.34.237:~/deployed-backend/
                    '''
                }
                echo 'Deployment files copied to App Server successfully.'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs above.'
        }
    }
}
