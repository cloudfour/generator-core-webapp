'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');

describe('templates', function () {
  describe('templates enabled via CLI option', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .withOptions({ templates: true })
        .on('end', done);
    });

    it('registers the "html" gulp task', function () {
      assert.fileContent('gulpfile.babel.js', 'tasks.html');
    });

    it('adds the "html" task config', function () {
      assert.fileContent('gulp.config.js', 'config.html');
    });
  });

  describe('templates enabled via prompt', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .withPrompts({ templates: true })
        .on('end', done);
    });

    it('registers the "html" gulp task', function () {
      assert.fileContent('gulpfile.babel.js', 'tasks.html');
    });
  });

});
