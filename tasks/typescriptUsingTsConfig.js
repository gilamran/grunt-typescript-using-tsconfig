'use strict';
var typescript = require('typescript');
var path = require('path');
var fs = require('fs');
var tsconfigGlob = require('tsconfig-glob');
var chalk = require('chalk');
var pathParent = "..";
var defaultTsConfigName = "tsconfig.json";

module.exports = function (grunt) {

  grunt.registerMultiTask('typescriptUsingTsConfig', 'Compiling TypeScript using tsconfig.json', function () {
    function determineTsconfig(rootPath) {
      var isFile = grunt.file.isFile(rootPath),
          isDir = grunt.file.isDir(rootPath);

      if (isFile === true) {
        return rootPath;
      }
      if (isDir === true) {
        return path.join(rootPath, defaultTsConfigName);
      }
      grunt.fail.warn("Can not determine tsconfig.json, invalid state");
    }

    function createTsConigFileIfNotPresent(tsconfigPath) {
      if (!grunt.file.exists(tsconfigPath)) {
        grunt.file.write(tsconfigPath, JSON.stringify(options.defaultTsConfig, null, 2));
        console.log('New tsconfig.json was created at', tsconfigPath);
      }
    }

    function processTsConfigGlobbing(tsconfigPath) {
      var config = {
        configPath: path.dirname(tsconfigPath),
        configFileName: path.basename(tsconfigPath),
        intend: 2
      };

      tsconfigGlob(config);
    }

    function processTsConfig() {
      var tsconfigPath = determineTsconfig(options.rootPath);

      createTsConigFileIfNotPresent(tsconfigPath);
      processTsConfigGlobbing(tsconfigPath);
    }

    function getTypeScriptCompilerBinPath() {
      var customCompilerPath = options.customCompilerPath;
      if (customCompilerPath && fs.existsSync(customCompilerPath)) {
        return customCompilerPath;
      }

      var ownRoot = path.resolve(path.dirname((module).filename), pathParent);
      var projectRoot = path.resolve(ownRoot, pathParent, pathParent);
      var binSub = path.join('node_modules', 'typescript', 'bin', 'tsc');

      var projectCompilerPath = path.join(projectRoot, binSub);
      if (fs.existsSync(projectCompilerPath)) {
        return projectCompilerPath;
      }

      var localCompilerPath = path.join(ownRoot, binSub);
      if (fs.existsSync(localCompilerPath)) {
        return localCompilerPath;
      }

      grunt.fail.warn("TypeScript compiler was not found");
    }

    function compileTypeScript(doneCallback) {
      var tsc = getTypeScriptCompilerBinPath(),
          tsconfigPath = determineTsconfig(options.rootPath);

      console.log('Running', process.execPath, tsc, '--project', tsconfigPath);
      grunt.util.spawn({
        cmd: process.execPath,
        args: [tsc, '--project', tsconfigPath]
      }, function (error, result, code) {
        if (code === 0) {
          console.log(chalk.green("TypeScript build success"));
        }
        else {
          // New TypeScript compiler uses stdout for user code errors. Old one used stderr.
          var errDesc = result.stdout || result.stderr;
          grunt.fail.warn(errDesc, code);
          doneCallback(false);
        }
        doneCallback();
      });
    }

    var options = this.options({
      rootPath: "./",
      defaultTsConfig: {
        "compilerOptions": {
          "target": "es5",
          "module": "commonjs",
          "removeComments": false,
          "declaration": false,
          "sourceMap": false
        },
        "filesGlob": [
          "./**/*.ts"
        ],
        "files": []
      }
    });
    processTsConfig();
    compileTypeScript(this.async());
  });
};
