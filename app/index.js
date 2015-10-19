'use strict';
var generators = require('yeoman-generator');
var yosay      = require('yosay');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
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
      this.fs.copy(
        this.sourceRoot() + '/gulp*',
        this.destinationRoot()
      );
    },
    packageJSON: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
    },
    src: function () {
      this.fs.copy(
        this.sourceRoot() + '/src/*',
        this.destinationRoot() + '/src/'
      );
    }
  },
  end: {
    sayBye: function () {
      this.log('All done! Bye, now!');
    }
  }
});
