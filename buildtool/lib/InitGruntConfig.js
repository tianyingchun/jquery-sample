var url = require('url');
var _ = require('lodash');
var path = require('path');
var projectInfo = require('./ProjectInfo');
var webpackHotConfig = require('../webpack.hot.config');
var webpackDevConfig = require('../webpack.dev.config');
var webpackProdConfig = require('../webpack.prod.config');
var default_config = projectInfo.config;

// Reset the webpack build configuration.
var resetWebpackConfig = function (grunt, webpack, projectName, projectMetaInfo) {

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

  return webpack;
};
/**
 * get specificed webpack via various conditions.
 * @param  {Object} grunt
 * @param  {String} mode        'devServer','devBuild','prodBuild'
 * @param  {Object} projects     projects defined in build.config.js
 * @return {Object}              webpack configuration
 */
var getWebpackConfig = function (grunt, mode, projects) {
  var result = {};

  Object.keys(projects).forEach(function (projectName) {
    var webpack = null;
    var project = _.clone(projects[projectName]);

    // get project meta config.
    var projectMetaInfo = project._metaInfo;
    delete project._metaInfo;

    // create build task config 'project.subProject'.
    Object.keys(project).forEach(function (subProjectName) {

      // current task.
      var subProject = project[subProjectName];
      if (subProject._metaInfo) {
        projectMetaInfo = subProject._metaInfo;
        delete subProject._metaInfo;
      }
      switch (mode) {
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

      // override webpack.entry
      webpack.entry[subProjectName] = [subProject.entry];

      var taks_target_name = projectName + '.' + subProjectName;

      console.log('`' + taks_target_name + '` metaInfo: ', projectMetaInfo);

      // reset webpack configuration.
      resetWebpackConfig(grunt, webpack, projectName, projectMetaInfo);

      grunt.log.ok(taks_target_name + ' entries: ', Object.keys(webpack.entry));
      result[taks_target_name] = webpack;

      grunt.log.ok('webpack task target name: ', taks_target_name);
      grunt.log.writeln('\n---------------------------------------------------');

    });

  });

  return result;
};

// only for 'devServer', build all sub-project(sub-modules) one time.
var getHotWebpackConfig = function (grunt, mode, projects) {
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
    var project = projects[projectName];

    // get project meta config.
    var projectMetaInfo = project._metaInfo;
    delete project._metaInfo;

    var webpack = webpackHotConfig();
    webpack.output.path = default_config.built.baseDir;
    webpack.output.publicPath = default_config.assets.dev;

    // reset the configuration of webpack
    resetWebpackConfig(grunt, webpack, projectName, projectMetaInfo);

    // create build task config 'project.subModule'
    Object.keys(project).forEach(function (subModuleName) {

      // current subModule.
      var subModule = project[subModuleName];
      // override webpack.entry for hot dev server.
      webpack.entry[subModuleName] = dev_server_entry.concat([subModule.entry]);

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
 * @param  {String} subProjectName optional
 * @Param  {Bool} isDevServer  the value indicates if we are preparing the dev server config.
 * @return {void}
 */
var prepareWebpackConfig = function (grunt, mode, projectName, subProjectName, isDevServer) {

  var buildProjects = projectInfo.projects || {};

  // specificed project name.
  if (projectName) {
    buildProjects = _.pick(buildProjects, [projectName]);
  }

  // specificed subProject name.
  if (subProjectName) {
    var project_path = projectName + '.' + subProjectName;
    if (!_.result(buildProjects, project_path)) {
      grunt.fail.fatal('The project `' + project_path + '` can not be found build.config.js');
      return;
    }
    buildProjects[projectName] = _.pick(buildProjects[projectName], [subProjectName]);
  }

  if (isDevServer) {
    // only for 'devServer', build all sub-project(sub-modules) one time.
    return getHotWebpackConfig(grunt, mode, buildProjects);
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

    // check if we are now build all sub-projects.
    var buildSubProject = promptResult['build.specific.subproject'];
    if (buildSubProject === 'build_all_sub_projects') {
      buildSubProject = '';
    }
    grunt.config.set('webpack', prepareWebpackConfig(grunt, mode, buildProjectName, buildSubProject));

    grunt.log.ok('building: ', 'project[' + buildProjectName + ']' + '.' + 'subProject[' + buildSubProject + ']');
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

  // sub project chioces.
  var subProjectChoices = [];

  subProjectChoices.push({
    name: 'build_all_sub_projects',
    value: 'build_all_sub_projects',
    checked: true
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
    config: 'build.specific.subproject',
    type: 'list',
    message: 'What specific sub project would you like to build ?',
    choices: function () {
      return subProjectChoices;
    },
    when: function (answers) {
      var answer = answers['list.all.projects'];
      var buildAllProject = (answer === 'build_all_projects');

      // if we need to build specificed sub project, need to return true.
      if (!buildAllProject) {
        var projectInfo = projects[answer];

        // build specific sub project.
        Object.keys(projectInfo).forEach(function (subProjectName) {
          if (subProjectName !== '_metaInfo') {
            subProjectChoices.push({
              name: subProjectName,
              value: subProjectName
            });
          }
        });
      }
      return !buildAllProject;
    }
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
  // get prepared hotserver webpack config.
  var devHotConfig = prepareWebpackConfig(grunt, 'devServer', projectName, '', true);

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
};
/**
 * Initialize grunt config task section data.
 * @param  {Object} grunt
 */
module.exports = {
  initWebpackDevServerConfig: initWebpackDevServerConfig,
  initPromptConfig: initPromptConfig
};
