var path = require('path');
var url = require('url');
var debug = require('debug');
var config = require('../build.config.js');
var _ = require('lodash');

var logger = debug('server:serverRenderParams');

/**
 * Dynamic load routes, resources for isomorphic server via ./build.config.js
 * only can be used in node environment.
 * @param  {Object} req express get req
 * @param  {Object} env node process.env.NODE_ENV
 */
var getRenderParams = function (req, env) {
  var jsBundles = [];
  var cssBundles = [];
  // The sub project, the current load project.
  var fundProject = null;

  var projects = config.projects;
  var options = config.options;

  // iso static cdn root.
  var cdnRoot = env === 'development' ? options.assets.dev : options.assets.prod;

  // '/workspace/list?name=tyc&type=1&other'
  // var url = req.url;

  // { name: 'tyc', type: '1', other: '' }
  var query = req.query;

  // var params = req.params;
  // '/workspace/list'
  var urlPath = req.path;

  // logger('url path', url, query, urlPath);

  _.each(projects, function (project, projectName) {
    var _project = null;
    _.each(project, function (subProject, subProjectName) {
      // logger('subporject: ', subProject)
      if (subProject.match && subProject.match.test(urlPath)) {
        _project = subProject;
        // project name.
        _project.projectName = projectName;
        // sub project name.
        _project.subProjectName = subProjectName;

        // the project meta info.
        _project.metaInfo = project._metaInfo || {};

        return false;
      }
    });
    if (_.isObject(_project)) {
      // logger('found: ', _project);
      fundProject = _project

      return false;
    }
  });

  if (_.isObject(fundProject)) {
    var version = fundProject.metaInfo.version || '';

    // generate all css bundle files.
    _.each(fundProject.cssBundles || [], function (css) {
      var linkHref = url.resolve(cdnRoot, _.template(css)({
        version: version
      }));
      var name = path.basename(linkHref, '.css');
      var link = {
        href: linkHref,
        name: name
      }
      cssBundles.push(link);
    });

    // generate all js bundle files.
    _.each(fundProject.jsBundles || [], function (js) {
      jsBundles.push(url.resolve(cdnRoot, _.template(js)({
        version: version
      })));
    });
  } else {
    console.warn('=========can not find any matched routes!!!=========');
  }

  var result = {
    project: fundProject,
    jsBundles: jsBundles,
    cssBundles: cssBundles
  };

  // logger('result: ', result);
  return result;
}

module.exports = getRenderParams;
