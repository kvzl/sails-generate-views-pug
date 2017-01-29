var util = require('util');
var _ = require('lodash');
_.defaults = require('merge-defaults');

module.exports = {
  before: function (scope, cb) {

    if (!scope.rootPath) {
      return cb( INVALID_SCOPE_VARIABLE('rootPath') );
    }

    // Attach defaults
    _.defaults(scope, {
      rootPath: scope.rootPath,
    });


    cb();
  },


  targets: {

		'./views/403.pug': { copy: '403.pug' },
		'./views/404.pug': { copy: '404.pug' },
		'./views/500.pug': { copy: '500.pug' },
		'./views/homepage.pug': { copy: 'homepage.pug' },
		'./views/layout.pug': { copy: 'layout.pug' }

  },


  templatesDirectory: require('path').resolve(__dirname, './templates'),
};


/**
 * INVALID_SCOPE_VARIABLE()
 *
 * Helper method to put together a nice error about a missing or invalid
 * scope variable. We should always validate any required scope variables
 * to avoid inadvertently smashing someone's filesystem.
 *
 * @param {String} varname [the name of the missing/invalid scope variable]
 * @param {String} details [optional - additional details to display on the console]
 * @param {String} message [optional - override for the default message]
 * @return {Error}
 * @api private
 */

function INVALID_SCOPE_VARIABLE (varname, details, message) {
  var DEFAULT_MESSAGE =
  'Issue encountered in generator "sails-generate-views-pug":\n'+
  'Missing required scope variable: `%s`"\n' +
  'If you are the author of `sails-generate-views-pug`, please resolve this '+
  'issue and publish a new patch release.';

  message = (message || DEFAULT_MESSAGE) + (details ? '\n'+details : '');
  message = util.inspect(message, varname);

  return new Error(message);
}
