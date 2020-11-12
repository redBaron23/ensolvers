# Ensolvers

This is an exercise carried out for the company Ensolvers you can checkout the requirements [here](https://github.com/redBaron23/ensolvers/blob/master/requirements.pdf)


## Technologies Used

This project was carried out with the following technologies:

Backend:
I chose use a serverless backend, using Amazon Web Service Cloud, so the following technologies are provided by Amazon.


Server:

* [ MYSQL ] - 5.7.32
* [ Java ] - 1.8
* [ Spring Boot ] - 2.3.5
* [ Spring ] - 4.8.1

Serverless:

* [Nodejs ] - 12.x
* [Lambda] - This make the serverless magic!
* [ EC2 ] - Virtual Cloud machine you can checkout the current master project [here](http://3.83.205.41:5000)
* [Dynamodb] - A no-sql database
* [Amplify] - You can checkout the CD/CI [old master branch](https://master.d1xbpv217otl93.amplifyapp.com) with Dynamo.
* [ApiGateWay] - A way to connect the lambda function with the API/REST

Frontend:

* [React 11.1.1] - Frontend 
* [Material-ui 4.11.0] - Framework for React


First you need to clone this branch



### Prerequisites

* [ npm ] -
* [ Docker ] - It uses a Mysql docker image
* [ Java ] - 1.8

You will need node and npm installed. Or you can just use it on your browser [here](http://3.83.205.41:5000)

### Installing

```git clone https://github.com/redBaron23/ensolvers```

Now you can use the script running:

```chmod +x build.zsh
./build.zsh
```


```

Now you are free to go.

### Note

User = manfred
Password = 123456


### Important

With the script you can only  run the client-side because the lambda function and the dynamodb cannot run on premises.
