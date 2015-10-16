module.exports = function (grunt) {

  grunt.initConfig({
    // Eslint task for current project.
    eslint: {
      //http://eslint.org/docs/rules/
      options: {
        configFile: '.eslintrc'
      },
      jquery: [
        './projects/**/*.js'
      ]
    },
    nodemon: {
      server: {
        script: './bin/simple',
        options: {
          nodeArgs: [ /*'--debug' */ ],
          ignore: ['node_modules/**'],
          env: {
            PORT: 4001,
            // for development, isomorphic server rendering
            NODE_ENV: '',
            DEBUG_COLORS: true
          },
          ext: 'js,jsx,html,ejs'
        }
      },
      thymol: {
        script: './bin/thymol/bin/thymol-server',
        options: {
          nodeArgs: [''],
          //'./': identifies the base directory of your web application (the webapp root directory).
          //'./mock/docs': is the (optional) relative path from the webapp root directory to the template directory.
          args: ['./', './mock'],
          ignore: ['node_modules/**'],
          env: {
            PORT: 4002,
            // for development, isomorphic server rendering
            NODE_ENV: '',
            DEBUG: 'express:thymolEngine,thymol-server',
            DEBUG_COLORS: true
          },
          ext: 'js,jsx,html'
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  // Load customized webpack build infrastructure.
  // useage:
  //  grunt {hot:projectName}
  //  grunt dev-build
  //  grunt prod-build
  // ---------------------------------------------//
  require('./buildtool')(grunt);

  grunt.registerTask('server', ['nodemon:server']);
  grunt.registerTask('thymol', ['nodemon:thymol']);

};
