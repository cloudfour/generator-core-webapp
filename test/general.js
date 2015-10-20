'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');

describe('general', function () {
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

  it('needs to have package.json/npmInstall tested');
  /**
   * I believe I can do this by mocking `npmInstall`
   * the way https://github.com/yeoman/generator-bootstrap/blob/master/test/test.js
   * mocks `bowerInstall`. And ideally use `sinon` to
   * spy on how it's invoked.
   **/

});
