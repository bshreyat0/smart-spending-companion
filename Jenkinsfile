pipeline {
    agent any

    parameters {
        string(
            name: 'COMMIT_HASH',
            defaultValue: '',
            description: 'Enter the Git commit hash to build'
        )
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'

                bat '''
                    git fetch origin develop
                    git checkout %COMMIT_HASH%
                '''
            }
        }

        stage('Show Commit') {
            steps {
                echo 'Commit being built:'

                bat '''
                    git log -1 --oneline
                '''
            }
        }

        stage('Build') {
            steps {
                echo 'Building Smart Spending Companion...'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying Smart Spending Companion...'
            }
        }
    }

    post {
        success {
            echo 'Build and deployment successful!'
        }

        failure {
            echo 'Build failed!'
        }
    }
}
