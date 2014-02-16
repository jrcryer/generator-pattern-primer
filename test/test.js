/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('pattern-primer generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('pattern-primer:app', [
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ]);
      this.app.options['skip-install'] = true;

      done();
    }.bind(this));
  });

  it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    this.app = require('../app');
  });

  it('creates expected files', function (done) {
    var expected = [
      '.bowerrc',
      '.editorconfig',
      'bower.json',
      'package.json',
      'Gruntfile.js',
      'app/404.html',
      'app/favicon.ico',
      'app/robots.txt',
      'app/index.html',
      'app/_patterns.html',
      'app/styles/main.scss'
    ];

    helpers.mockPrompt(this.app, {
      features: ['includeSass']
    });

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
