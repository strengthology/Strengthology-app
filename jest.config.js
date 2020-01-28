module.exports = {
    preset: 'jest-preset-angular',
    rootDir: "../strengthology-app",
    roots: ['src'],
    transform: {
      '^.+\\.(ts|js|html)$': 'ts-jest',
    },
    // setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    moduleNameMapper: {
      '@app/(.*)': '<rootDir>/src/app/$1',
      '@assets/(.*)': '<rootDir>/src/assets/$1',
      '@core/(.*)': '<rootDir>/src/app/core/$1',
      '@env': '<rootDir>/src/environments/environment',
      '@src/(.*)': '<rootDir>/src/src/$1',
      '@state/(.*)': '<rootDir>/src/app/state/$1'
    },
    transformIgnorePatterns: [
      '/node_modules/(?!@ionic|ngx-socket-io/).+\\.js$'
    ]
  };