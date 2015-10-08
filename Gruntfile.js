module.exports = function (grunt) {

  grunt.initConfig({
    // Eslint task for current project.
    eslint: {
      //http://eslint.org/docs/rules/
      options: {
        configFile: '.eslintrc'
      },
      react: [
        './projects/**/*{.js}'
      ]
    },
    nodemon: {
      server: {
        script: './bin/simple',
        options: {
          nodeArgs: [ /*'--debug' */ ],
          ignore: ['node_modules/**'],
          env: {
            PORT: '4001',
            // for development, isomorphic server render react
            NODE_ENV: '',
            DEBUG_COLORS: true
          },
          ext: 'js,jsx,html,ejs'
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  // Load customized webpack build infrastructure.
  require('./buildtool')(grunt);

  grunt.registerTask('server', ['nodemon:server']);

};
