'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.typescriptUsingTsConfig = {
	setUp: function (done) {
		// setup here if necessary
		done();
	},
  noTsConfigProject: function (test) {
		var actualJs = grunt.file.read('tmp/noTsConfigProject/dummy.js');
		var expectedJs = grunt.file.read('test/expected/noTsConfigProject/dummy.js');
		test.equal(actualJs, expectedJs, 'should compile a typescript file when no tsconfig.json present.');

		var actualTsConfig = grunt.file.read('tmp/noTsConfigProject/tsconfig.json');
		var expectedTsConfig = grunt.file.read('test/expected/noTsConfigProject/tsconfig.json');
		test.equal(actualTsConfig, expectedTsConfig, 'should compile a typescript file when no tsconfig.json present.');
		test.done();
	},
  basicConfigProject: function (test) {
		var actualJs1 = grunt.file.read('tmp/basicConfigProject/dummy1.js');
		var expectedJs1 = grunt.file.read('test/expected/basicConfigProject/dummy1.js');
		var actualJs2 = grunt.file.read('tmp/basicConfigProject/dummy2.js');
		var expectedJs2 = grunt.file.read('test/expected/basicConfigProject/dummy2.js');
		test.equal(actualJs1, expectedJs1, 'should compile 2 typescript files according to the given filesGlob.');
		test.equal(actualJs2, expectedJs2, 'should compile 2 typescript files according to the given filesGlob.');

		var actualTsConfig = grunt.file.read('tmp/basicConfigProject/tsconfig.json');
		var expectedTsConfig = grunt.file.read('test/expected/basicConfigProject/tsconfig.json');
		test.equal(actualTsConfig, expectedTsConfig, 'should compile a typescript project according to the given tsconfig.json.');
		test.done();
	},
  pathWithExplicitTsConfig: function (test) {
    var actualJs1 = grunt.file.read('tmp/pathWithExplicitTsConfig/dummy1.js');
    var expectedJs1 = grunt.file.read('test/expected/pathWithExplicitTsConfig/dummy1.js');
    var actualJs2 = grunt.file.read('tmp/pathWithExplicitTsConfig/dummy2.js');
    var expectedJs2 = grunt.file.read('test/expected/pathWithExplicitTsConfig/dummy2.js');
    test.equal(actualJs1, expectedJs1, 'should compile 2 typescript files with a custom tsconfig file.');
    test.equal(actualJs2, expectedJs2, 'should compile 2 typescript files with a custom tsconfig file.');

    var actualTsConfig = grunt.file.read('tmp/pathWithExplicitTsConfig/customTsConfig.json');
    var expectedTsConfig = grunt.file.read('test/expected/basicConfigProject/customTsConfig.json');
    test.equal(actualTsConfig, expectedTsConfig, 'should compile a typescript project according to the given tsconfig.json.');
    test.done();
  }
};
