var path = require('path');
module.exports = {
  // the optional configurations.
  options: {
    // the location related gruntfile of your projects root folder.
    // put web, admin into /projects/*
    projectRoot: './projects',

    devServer: {
      host: 'localhost',
      port: 3000,
      publicPath: 'http://localhost:3000/public/'
    },
    built: {
      // where the built files should be placed?
      baseDir: path.join(__dirname, 'public')
    },
    // assets public path (stylesheets,...)
    assets: {
      // the urlLoaderQuery used in buildtool/webpack.base.config.js <url-loader> config node.
      urlLoaderQuery: {
        context: 'projects/${projectName}/stylesheets',
        name: '${projectName}/[path][name].[ext]'
      },
      dev: 'http://localhost:3000/public/',
      prod: 'http://cdn.xx.com/public/'
    }
  },
  projects: {
    // ${projectName}, project layers, Note for webpack optimze suggestion,
    // if we have some submodule in projecet (multi) page, we need to attach submodule
    // into this project as multi entry points.
    testp1: {
       // the project meta config.
      _metaInfo: {
        version: ''
      },
      home: {
        // entry point, must be string.
        entry: './projects/testp1/home/index.js'
      },
      catalog: {
        entry: './projects/testp1/catalog/index.js'
      }
    },
    testp2: {
      home: {
        // entry point, must be string.
        entry: './projects/testp2/home/index.js'
      },
      catalog: {
        entry: './projects/testp2/catalog/index.js'
      }
    }
  }
};
