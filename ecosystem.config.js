module.exports = {
    apps: [
      {
        name: 'frontend',
        script: 'node_modules/.bin/ng',
        args: 'serve',
        env: {
          PORT: 4200,
        },
      },
      {
        name: 'backend',
        script: 'server.js',
        interpreter: 'node',
        env: {
          NODE_ENV: 'development',
          PORT: 3000,
        },
      },          
    ],
  };
  