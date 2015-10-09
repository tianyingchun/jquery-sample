var path = require('path');
module.exports = {
  // the optional configurations.
  options: {
    // the location related gruntfile of your projects root folder.
    // put web, admin into /projects/*
    projectRoot: './projects',

    devServer: {
      host: 'localhost',
      port: 3001,
      publicPath: 'http://localhost:3001/public/'
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
      dev: 'http://localhost:4001/public/',
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
        // the project meta config.
        _metaInfo: {
          version: ''
        },
        match: /^\/testp1\/home(\/)?/,
        // entry point, must be string.
        entry: './projects/testp1/home/index.js',
        jsBundles: ['http://localhost:4001/public/vendors/jquery/jquery.js${version}', 'testp1/home/bundle.js${version}'],
        cssBundles: ['http://localhost:4001/public/common.css', 'testp1/home/bundle.css${version}']
      },
      catalog: {
        match: /^\/testp1\/catalog(\/)?/,
        entry: './projects/testp1/catalog/index.js',
        jsBundles: ['http://localhost:4001/public/vendors/jquery/jquery.js${version}', 'testp1/catalog/bundle.js${version}'],
        cssBundles: ['http://localhost:4001/public/common.css', 'testp1/catalog/bundle.css${version}']
      }
    },
    testp2: {
      // the project meta config.
      _metaInfo: {
        version: ''
      },
      home: {
        // entry point, must be string.
        match: /^\/testp2\/home(\/)?/,
        entry: './projects/testp2/home/index.js',
        jsBundles: ['http://localhost:4001/public/vendors/jquery/jquery.js${version}', 'testp2/home/bundle.js${version}'],
        cssBundles: ['http://localhost:4001/public/common.css', 'testp2/home/bundle.css${version}']
      },
      catalog: {
        // entry point, must be string.
        match: /^\/testp2\/catalog(\/)?/,
        entry: './projects/testp2/catalog/index.js',
        jsBundles: ['http://localhost:4001/public/vendors/jquery/jquery.js${version}', 'testp2/catalog/bundle.js${version}'],
        cssBundles: ['http://localhost:4001/public/common.css', 'testp2/catalog/bundle.css${version}']
      }
    }
  }
};
