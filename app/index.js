'use strict';
var generators = require('yeoman-generator');
var yosay      = require('yosay');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },
  end: {
    sayBye: function () {
      this.log('All done! Bye, now!');
    }
  }
});
