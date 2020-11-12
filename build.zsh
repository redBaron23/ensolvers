#!/bin/zsh
#
#

#Mysql
./server/mysql/run.zsh 

#Javita
cd ./server/endpoint/
./run.zsh &

cd ../../

#React
cd ./client/
./build.zsh
