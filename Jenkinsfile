pipeline {
    agent any 
    stages {
        stage("Clone Code") {
            steps {
                echo "Cloning the code"
                git url: "https://github.com/zainwaseem/clinicspy.git", branch: "main"
            }
        }
        stage("Build with Docker Compose") {
            steps {
                echo "Building the images using Docker Compose"
                sh "docker-compose build"
            }
        }
        stage("Push to Docker Hub") {
            steps {
                echo "Pushing the images to Docker Hub"
                withCredentials([usernamePassword(credentialsId: "dockerHub", passwordVariable: "dockerHubPass", usernameVariable: "dockerHubUser")]) {
                    sh """
                    docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}
                    docker tag clinicspy-frontend ${env.dockerHubUser}/clinicspy-frontend:latest
                    docker push ${env.dockerHubUser}/clinicspy-frontend:latest
                    docker tag clinicspy-backend ${env.dockerHubUser}/clinicspy-backend:latest
                    docker push ${env.dockerHubUser}/clinicspy-backend:latest
                    """
                }
            }
        }
        stage("Deploy") {
            steps {
                echo "Deploying the containers using Docker Compose"
                sh "docker-compose down && docker-compose up -d"
            }
        }
    }
}
