# Ensolvers

This is an exercise carried out for the company Ensolvers you can checkout the requirements [here](https://github.com/redBaron23/ensolvers/blob/master/requirements.pdf)


## Technologies Used

This project was carried out with the following technologies:

Backend:
I chose use a serverless backend, using Amazon Web Service Cloud, so the following technologies are provided by Amazon.

* [Nodejs 12.x]
* [Lambda] - This make the serverless magic!
* [Dynamodb] - A no-sql database
* [Amplify] - You can checkout the CD/CI [master branch](https://master.d1xbpv217otl93.amplifyapp.com) and [dev branch](https://dev.d1xbpv217otl93.amplifyapp.com).
* [ApiGateWay] - A way to connect the lambda function with the API/REST

Frontend:
* [React 11.1.1] - Frontend 
* [Material-ui 4.11.0] - Framework for React


First you need to clone this branch



### Prerequisites

You will need node and npm installed. Or you can just use it on your browser [here](https://master.d1xbpv217otl93.amplifyapp.com)

### Installing

```git clone https://github.com/redBaron23/ensolvers```

Now you can use the script running:

```chmod +x build.zsh
./build.zsh
```

Or you can do it manually


```
cd client/
npm i
npm run build
serve -s ./build/index.html

```

And that's it the project is running



### Important

With the script you can only  run the client-side because the lambda function and the dynamodb cannot run on premises.