'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');
var chai   = require('chai');
var sinon  = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

describe('general', function () {
  describe('core functionality', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .on('end', done);
    });

    it('the generator can be required without throwing', function () {
      // not testing the actual run of generators yet
      require('../app');
    });

    it('creates expected files', function () {
      assert.file([
        'package.json',
        'gulp.config.js',
        'gulpfile.babel.js',
        '.gitignore',
        '.node-version',
        'src/main.js',
        'src/main.css'
      ]);
    });
  });
  describe('dependency management', function () {
    var npmStub;
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .on('ready', function (generator) {
          // When run in test, generator.npmInstall is a no-op
          // so we can't test its output. Instead, we'll
          // stub and make sure it is getting called correctly.
          npmStub = sinon.stub();
          generator.npmInstall = npmStub;
        })
        .on('end', done);
    });
    it('invokes npmInstall for dependencies', function () {
      var callArgs = npmStub.lastCall.args;
      expect(npmStub).to.have.been.calledOnce;
      expect(callArgs).to.have.length(2);
      expect(callArgs[0]).to.have.members(['gulp','babel-core','cloudfour/core-gulp-tasks']);
      expect(callArgs[1]).to.have.property('saveDev', true);
    });

  });
});
