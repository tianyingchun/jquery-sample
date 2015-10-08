var url = require('url');
var _ = require('lodash');
var path = require('path');
var projectInfo = require('./ProjectInfo');
var webpackHotConfig = require('../webpack.hot.config');
var webpackDevConfig = require('../webpack.dev.config');
var webpackProdConfig = require('../webpack.prod.config');
var default_config = projectInfo.config;

/**
 * get specificed webpack via various conditions.
 * @param  {Object} grunt
 * @param  {String} mode        'devServer','devBuild','prodBuild'
 * @param  {Object} projects     projects defined in build.config.js
 * @return {Object}              webpack configuration
 */
var getWebpackConfig = function (grunt, mode, projects) {
  var result = {};

  // The webpack dev server socket config for development phase.
  var dev_server_entry = [
    'webpack-dev-server/client?' + url.format({
      protocol: 'http',
      hostname: default_config.devServer.host,
      port: default_config.devServer.port
    }), 'webpack/hot/only-dev-server'
  ];

  Object.keys(projects).forEach(function (projectName) {
    var webpack = null;
    var project = projects[projectName];

    // get project meta config.
    var projectMetaInfo = project._metaInfo;
    delete project._metaInfo;

    switch (mode) {
      case 'devServer':
        webpack = webpackHotConfig();
        webpack.output.path = default_config.built.baseDir;
        webpack.output.publicPath = default_config.assets.dev;

        break;
      case 'devBuild':
        webpack = webpackDevConfig();
        webpack.output.path = path.join(default_config.built.baseDir, 'debug');
        webpack.output.publicPath = default_config.assets.dev;
        break;
      case 'prodBuild':
        webpack = webpackProdConfig();
        webpack.output.path = default_config.built.baseDir;
        webpack.output.publicPath = default_config.assets.prod;
        break;
    }
    var oExtractTextPlugin = _.find(webpack.plugins, function (item) {
      return 'ExtractTextPlugin' === item.constructor.name;
    });
    var oCommonsChunkPlugins = _.filter(webpack.plugins, function (item) {
      return 'CommonsChunkPlugin' === item.constructor.name;
    });

    _.each(oCommonsChunkPlugins, function (chunkItem) {
      chunkItem.filenameTemplate = _.template(chunkItem.filenameTemplate)({
        projectName: projectName
      });
    });

    // console.log('dddd:', oCommonsChunkPlugin);

    var oModuleUrlLoader = _.find(webpack.module.loaders, function (item) {
      return item.loader === 'url-loader';
    });

    // Set dist location for transfer url resources.
    _.extend(oModuleUrlLoader.query, _.mapValues(default_config.assets.urlLoaderQuery, function (val) {
      return _.template(val)({
        projectName: projectName
      });
    }));


    // Dynamic generate jsBundles, cssBundles for corresponding project.
    // ------------------------------------------------------------------
    // workspace/member/v1000/bundle.js --with version.
    // workspace/member/bundle.js
    // filename: '${projectName}/${subModuleName}/${version}/bundle.js'

    var cssBundlePath = path.normalize(_.template(oExtractTextPlugin.filename)({
      projectName: projectName,
      version: projectMetaInfo.version || ''
    }));

    grunt.log.writeln('\n---------------------------------------------------\n');
    grunt.log.ok('cssBundlePath:' + cssBundlePath);

    oExtractTextPlugin.filename = cssBundlePath;
    var jsBundlePath = path.normalize(_.template(webpack.output.filename)({
      projectName: projectName,
      version: projectMetaInfo.version || ''
    }));

    grunt.log.ok('jsBundlePath:' + jsBundlePath);
    webpack.output.filename = jsBundlePath; //'[name].dev-hot.entry.js';

    // create build task config 'project.subModule'
    Object.keys(project).forEach(function (subModuleName) {

      // current subModule.
      var subModule = project[subModuleName];

      if (mode === 'devServer') {
        // override webpack.entry for hot dev server.
        webpack.entry[subModuleName] = dev_server_entry.concat([subModule.entry]);
      } else {
        // override webpack.entry
        webpack.entry[subModuleName] = [subModule.entry]
      }

    });
    grunt.log.ok(projectName + ' entries: ', Object.keys(webpack.entry));
    result[projectName] = webpack;
    grunt.log.ok('webpack task target name: ', projectName);
    grunt.log.writeln('\n---------------------------------------------------');
  });

  return result;
};

/**
 * Prepare grunt `webpack` configuration
 * @param  {Object} grunt
 * @param  {String} mode  'devServer','devBuild','prodBuild'
 * @param  {String} projectName    optional
 * @return {void}
 */
var prepareWebpackConfig = function (grunt, mode, projectName) {

  var buildProjects = projectInfo.projects || {};
  // specificed project name.
  if (projectName) {
    buildProjects = _.pick(buildProjects, [projectName]);
  }
  return getWebpackConfig(grunt, mode, buildProjects);
};

// prompt task callback handler.
var promptTaskCallback = function (grunt, promptResult, mode) {
  var buildProjectName = promptResult['list.all.projects'];

  if (buildProjectName === 'build_all_projects') {

    if (true === promptResult['build.all.project.confirm']) {
      grunt.config.set('webpack', prepareWebpackConfig(grunt, mode));
      grunt.log.ok('building all projects defined in ./build.config.js');
      grunt.task.run(['webpack']);
    } else {
      grunt.log.ok('Task `build all projects ` cancelled');
    }
  } else {

    grunt.config.set('webpack', prepareWebpackConfig(grunt, mode, buildProjectName));

    grunt.log.ok('building: ', 'project[' + buildProjectName + ']');
    // run `webpack` task
    grunt.task.run(['webpack']);
  }
};
// initialize grunt `prompt` task config data.
var initPromptConfig = function (grunt) {

  // all projects.
  var projects = projectInfo.projects;

  // project choices.
  var projectChoices = [];

  projectChoices.push({
    name: 'build_all_projects',
    value: 'build_all_projects',
    checked: true
  });

  Object.keys(projects).forEach(function (projectName) {
    projectChoices.push({
      name: projectName,
      value: projectName
    });
  });

  // prompt questions.
  var questions = [];

  questions.push({
    config: 'list.all.projects',
    type: 'list',
    message: 'Which project would you like to build ?',
    default: 'build_all_projects',
    choices: projectChoices
  });

  questions.push({
    config: 'build.all.project.confirm',
    type: 'confirm',
    message: 'Are you sure you need to compile all projects at a time?',
    when: function (answers) {
      var answer = answers['list.all.projects'];
      // if we will build all project need second confirm.
      return answer === 'build_all_projects';
    }
  });

  // set grunt prompt config
  grunt.config.set('prompt', {
    devBuild: {
      // for `devBuild` prompt.
      options: {
        questions: questions,
        then: function (results, done) {
          console.log('prompt then().', results);
          promptTaskCallback(grunt, results, 'devBuild');
        }
      }
    },
    prodBuild: {
      // for `prodBuild` prompt.
      options: {
        questions: questions,
        then: function (results, done) {
          console.log('prompt then().', results);
          promptTaskCallback(grunt, results, 'prodBuild');
        }
      }
    }
  });
};
// initial webpack-dev-server config.
var initWebpackDevServerConfig = function (grunt, projectName) {

    var projects = projectInfo.projects;

    if (!projects[projectName]) {
      grunt.fail.fatal('The project `' + projectName + '` can not be fund in build.config.js')
      return;
    }
    var devHotConfig = prepareWebpackConfig(grunt, 'devServer', projectName);

    var config = {
      options: {
        webpack: devHotConfig[projectName],
        publicPath: default_config.devServer.publicPath
      }
    };

    config[projectName] = {
      keepAlive: true,
      hot: true,
      historyApiFallback: true,
      host: default_config.devServer.host,
      port: default_config.devServer.port,
      stats: {
        colors: true
      }
    };
    // console.log(JSON.stringify(config))

    grunt.config.set('webpack-dev-server', config);
  }
  /**
   * Initialize grunt config task section data.
   * @param  {Object} grunt
   */
module.exports = {
  initWebpackDevServerConfig: initWebpackDevServerConfig,
  initPromptConfig: initPromptConfig
};
