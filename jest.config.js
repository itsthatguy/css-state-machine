const path = require('path');

module.exports = {
  moduleDirectories: ['node_modules/', 'src/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  // setupFiles: ['raf/polyfill'],
  testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
  transform: { '.(ts|tsx)': 'ts-jest' },
  unmockedModulePathPatterns: [
    'lodash'
  ]
};
