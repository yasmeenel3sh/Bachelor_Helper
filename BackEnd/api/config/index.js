// Global App Configuration
module.exports = {
    //BACKEND_URI: 'http://localhost:3000/',
    FRONTEND_URI: process.env.FRONTEND_URI || 'http://localhost:4200/',
    SECRET: '32876qihsdh76@&#!742(*#HG&#28702y&##@^!()(&^#))jhscbd',
    MONGO_URI:
        process.env.NODE_ENV === 'production'
            ? ''
            : process.env.NODE_ENV === 'test'
            ? 'mongodb://localhost:27017/Bachtest'
            : 'mongodb://database/Bachelor_Helper', //mongodb://localhost:27017/Bachelor_Helper
    EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};