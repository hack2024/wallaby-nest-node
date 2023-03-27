module.exports = function() {
  return {
    files: [
      'tsconfig.json',
      'src/**/*.ts', 
      'test/**/*.ts',
      '!test/**/*.spec.ts'
    ],

    tests: [
      'test/**/*.spec.ts',
      '!test/e2e/**/*.spec.ts'
    ],

    setup: wallaby => {
      if (!global._tsconfigPathsRegistered) {
        const tsConfigPaths = require('tsconfig-paths');
        const tsconfig = require('./tsconfig.json');
        tsConfigPaths.register({
          baseUrl: tsconfig.compilerOptions.baseUrl,
          paths: tsconfig.compilerOptions.paths
        });
        global._tsconfigPathsRegistered = true;
      }

      global.expect = require('chai').expect;
    },

    testFramework: 'mocha',

    env: {
      type: 'node',
      runner: 'node'
    },

    workers: { recycle: true }
  };
};