// Global App Configuration
module.exports = {
  FRONTEND_URI: process.env.FRONTEND_URI || 'http://localhost:4200/',
  SECRET: '32876qihsdh76@&#!742(*#HG&#28702y&##@^!()(&^#))jhscbd',
  MONGO_URI:
    process.env.NODE_ENV === 'production'
      ? 'mongodb://admin:se2018@ds157818.mlab.com:57818/nodejs-to-do'
      : 'mongodb://localhost:27017/nodejs-to-do'
};
