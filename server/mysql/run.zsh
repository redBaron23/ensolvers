#!/bin/zsh
#
#
#Start docker service
sudo systemctl start docker

#Pull docker mysql
sudo docker pull mysql:5.7

#Run mysql database
sudo docker run -p 3307:3306 --name mysql-ensolvers -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=ensolvers -d mysql:5.7

#Logs
sudo docker container logs mysql-ensolvers

