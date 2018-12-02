# Bachelor Helper
used by gucians looking forward to do their bachelor abroad to look up older students who already did their bachelor abroad and contact them.

**yasmeen khaled:** 37-6614
**olfat mostafa:** 37-
**nourhan ahmed**:37-

##Running the app 

1- **Add config file to BackEnd**
```
 a)Go to BackEnd
 b)api
 c)config
 d)create a file called index.js
  **Format**
  
module.exports = {
    FRONTEND_URI: process.env.FRONTEND_URI || 'http://localhost:4200/',
    SECRET: '32876qihsdh76@&#!742(*#HG&#28702y&##@^!()(&^#))jhscbd',
    MONGO_URI:
        process.env.NODE_ENV === 'production'
            ? 'URL OF DEPLOYED DATABASE'
            : process.env.NODE_ENV === 'test'
            ? 'mongodb://localhost:27017/NAME OF DATABASE'
            : 'mongodb://database/NAME OF DATABASE', //mongodb://localhost:27017/NAME OF DATABASE (THE first for docker , the second for local running )
    EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};
```
2- **Update Environt in FrontEnd**
```

 a)Go to FrontEnd
 b)src
 c)environments
 d)environment.ts

  in the const environment
   domain: "http://192.168.99.100:3000/api/" if running docker on virtual machine on windows
   OR
   domain:http://localhost:3000/api/ if running docker on linux or locally 
 ```
3- **Run Docker**
```

 -Go to project directory on cmd
  Write command 
 -docker-compose up

  -if on linux go to http://localhost:4200
  -if on virtual machine windows http://192.168.99.100:3000:4200
```
 **Running Locally**
 <h1 align="center">  Bachelor Helper </h1>

<!-- # <h2 align="center"> [Nawwar Educational Platform](https://nawwar.tk) </h2> -->


## Getting Started:
> Open **3** Terminals and run each of the following command

_**Server:**_

```
cd BackEnd
npm install
npm start 
```

_**DataBase:**_

```
mongod
```

_**Angular:**_

```
cd FrontEnd
npm install
ng serve
```
 