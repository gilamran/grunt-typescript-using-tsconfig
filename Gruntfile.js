/*
 * grunt-typescript-using-tsconfig
 *
 *
 * Copyright (c) 2015 Gil Amran
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    clean: {
      tests: ['tmp', './test/fixtures/noTsConfigProject/tsconfig.json']
    },

    typescriptUsingTsConfig: {
      noTsConfigProject: {
        options: {
          rootDir: "./test/fixtures/noTsConfigProject",
          defaultTsConfig: {
            "compilerOptions": {
              "target": "es5",
              "module": "commonjs",
              "removeComments": false,
              "declaration": false,
              "sourceMap": false,
              "outDir": "./tmp/noTsConfigProject"
            },
            "filesGlob": [
              "./**/*.ts"
            ],
            "files": []
          }
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*.js']
    }
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('test', ['clean', 'typescriptUsingTsConfig', 'nodeunit']);

  grunt.registerTask('default', ['jshint', 'test']);
};
