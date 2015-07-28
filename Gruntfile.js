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
      tests: ['tmp']
    },

    copy: {
      tests: {
        files: [
          {expand: true, cwd: 'test/fixtures', src:['**'], dest: 'tmp/'}
        ]
      }
    },

    typescriptUsingTsConfig: {
      noTsConfigProject: {
        options: {
          rootDir: "./tmp/noTsConfigProject",
          defaultTsConfig: {
            "compilerOptions": {
              "target": "es5",
              "module": "commonjs",
              "removeComments": false,
              "declaration": false,
              "sourceMap": false,
              "outDir": "./"
            },
            "filesGlob": [
              "**/*.ts"
            ],
            "files": []
          }
        }
      },
      basicConfigProject: {
        options: {
          rootDir: "./tmp/basicConfigProject"
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*.js']
    }
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('test', ['clean', 'copy', 'typescriptUsingTsConfig', 'nodeunit']);

  grunt.registerTask('default', ['jshint', 'test']);
};
