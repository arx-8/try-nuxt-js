// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.vue',
    '<rootDir>/src/pages/**/*.vue',
  ],
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.common.js',
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
}

module.exports = config
