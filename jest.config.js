const { jsWithTs: tsjPreset } = require('ts-jest/presets');

module.exports = {
  roots: [
    '<rootDir>/app',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      isolatedModules: true,
    },
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx|ts|js)?$',
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
  ],
  moduleDirectories: [
    'node_modules',
    'app',
    'test',
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'node',
    'ts',
    'tsx',
  ],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/app/$1',
  },
  preset: 'ts-jest/presets/js-with-ts',
}
