pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    stages {
        stage('Install Dependencies') {
            steps { bat 'npm ci' }
        }
        stage('Build') {
            steps { bat 'npm run build' }
        }
        stage('Test') {
            steps { bat 'npm run lint' }
        }
        stage('Package') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }

    post {
        success { echo 'Application built successfully!' }
        failure { echo 'Build failed. Check Console Output.' }
    }
}
