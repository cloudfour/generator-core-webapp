'use strict';
var generators = require('yeoman-generator');
var yosay      = require('yosay');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.option(
      'templates',
      {
        desc     : 'Add "html" task and support for data-driven Handlebars template compilation with helpers and front matter',
        type     : Boolean,
        defaults : false
      }
    );
  },
  prompting: function () {
    var done = this.async();
    this.prompt([{
      name: 'name',
      message: 'Project name for package.json',
      type: 'input',
      default: 'cloudfour-web-project'
    },
    {
      name   : 'templates',
      message: 'Add "html" task and template compilation?',
      type   : 'confirm',
      default: false
    }], function (answers) {
      this.features = {};
      this.features.name      = answers.name;
      this.features.templates = this.options.templates || answers.templates;
      done();
    }.bind(this));
  },
  writing: {
    config: function () {
      var configs = {
        'gitignore'   : '.gitignore',
        'node-version': '.node-version'
      };
      for (var sourceFile in configs) {
        this.fs.copy(
          this.templatePath(sourceFile),
          this.destinationPath(configs[sourceFile])
        );
      }
    },
    gulp: function () {
      this.fs.copyTpl(
        this.templatePath('gulpfile.babel.js'),
        this.destinationPath('gulpfile.babel.js'),
        this.features
      );
      this.fs.copyTpl(
        this.templatePath('gulp.config.js'),
        this.destinationPath('gulp.config.js'),
        this.features
      );
    },
    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.features
      );
    },
    src: function () {
      this.fs.copy(
        this.sourceRoot() + '/src/*',
        this.destinationRoot() + '/src/'
      );
    }
  },
  install: function () {
    this.npmInstall([
      'babel-core',
      'gulp',
      'cloudfour/core-gulp-tasks'
    ], { 'saveDev': true });
  },
  end: {
    sayBye: function () {
      this.log('All done! Bye, now!');
    }
  }
});
