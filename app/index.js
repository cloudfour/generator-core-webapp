'use strict';
var generators = require('yeoman-generator');
var yosay      = require('yosay');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },
  writing: {
    gulp: function () {
      this.fs.copy(
        this.sourceRoot() + '/gulp*',
        this.destinationRoot()
      );
    },
    nodeVersion: function () {
      this.fs.copy(
        this.templatePath('node-version'),
        this.destinationPath('.node-version')
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
