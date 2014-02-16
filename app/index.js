'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var PatternPrimerGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies({
          bower: false,
          npm: true,
          skipInstall: false,
          callback: function () {
            console.log('Everything is ready!');
          }
        });
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the fantastic PatternPrimer generator.'));

    // var prompts = [{
    //   type: 'confirm',
    //   name: 'someOption',
    //   message: 'Would you like to enable this option?',
    //   default: true
    // }];

    // this.prompt(prompts, function (props) {
    //   this.someOption = props.someOption;

    //   done();
    // }.bind(this));
    done();
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/styles');
    this.mkdir('app/scripts');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_gruntfile.js', 'Gruntfile.js');

    this.copy('index.html', 'app/index.html');
    this.directory('patterns', 'app/patterns');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = PatternPrimerGenerator;