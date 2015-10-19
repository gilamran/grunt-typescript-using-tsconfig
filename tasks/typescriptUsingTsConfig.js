'use strict';
var typescript = require('typescript');
var path = require('path');
var fs = require('fs');
var tsconfigGlob = require('tsconfig-glob');
var chalk = require('chalk');

module.exports = function (grunt) {

  grunt.registerMultiTask('typescriptUsingTsConfig', 'Compiling TypeScript using tsconfig.json', function () {


    function processTsConfig() {
      var tsconfigPath = path.join(options.rootDir, 'tsconfig.json');

      if (!grunt.file.exists(tsconfigPath)) {
        grunt.file.write(tsconfigPath, JSON.stringify(options.defaultTsConfig, null, 2));
        console.log('New tsconfig.json was created at', tsconfigPath);
      }

      var tsconfigContents = grunt.file.readJSON(tsconfigPath);

      // only call tsconfigGlob if there is a glob pattern in tsconfig.json
      if (tsconfigContents.filesGlob) {
        tsconfigGlob({
          configPath: options.rootDir,
          cwd: process.cwd(),
          indent: 2
        });
      }
    }

    function getTypeScriptCompilerBinPath() {
      var customCompilerPath = options.customCompilerPath;
      if (customCompilerPath && fs.existsSync(customCompilerPath)) {
        return customCompilerPath;
      }

      var ownRoot = path.resolve(path.dirname((module).filename), '..');
      var projectRoot = path.resolve(ownRoot, '..', '..');
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
      var tsc = getTypeScriptCompilerBinPath();
      console.log('Running', process.execPath, tsc, '--project', options.rootDir);
      grunt.util.spawn({
        cmd: process.execPath,
        args: [tsc, '--project', options.rootDir]
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
      rootDir: "./",
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
