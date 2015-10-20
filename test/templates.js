'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');
var chai   = require('chai');
var expect = chai.expect;
require('babel/register');

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

    it('adds the html watcher to the watch task', function () {
      // Note: Babel transpilation makes this test slower than average
      var config = require(path.join(__dirname, 'temp/gulp.config.js')),
        watchers = config.watch.watchers;
      expect(watchers).to.have.length(2);
      expect(watchers[1].tasks).to.include('html');
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

    it('adds the "html" task config', function () {
      assert.fileContent('gulp.config.js', 'config.html');
    });
  });

  describe('templates disabled via defaults', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .on('end', done);
    });

    it('does not register the "html" gulp task', function () {
      assert.noFileContent('gulpfile.babel.js', 'tasks.html');
    });

    it('does not add the "html" task config', function () {
      assert.noFileContent('gulp.config.js', 'config.html');
    });

    it('does not add a watcher for `html` task', function () {
      assert.noFileContent('gulp.config.js', "['html']");
    });
  });

  describe('templates disabled via option', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .withOptions({ templates: false })
        .on('end', done);
    });

    it('does not register the "html" gulp task', function () {
      assert.noFileContent('gulpfile.babel.js', 'tasks.html');
    });

    it('does not add the "html" task config', function () {
      assert.noFileContent('gulp.config.js', 'config.html');
    });
  });

  describe('templates disabled via prompt', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .withPrompts({ templates: false })
        .on('end', done);
    });

    it('does not register the "html" gulp task', function () {
      assert.noFileContent('gulpfile.babel.js', 'tasks.html');
    });

    it('does not add the "html" task config', function () {
      assert.noFileContent('gulp.config.js', 'config.html');
    });
  });

});
