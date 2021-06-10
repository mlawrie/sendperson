module.exports = {
  'testEnvironment': 'jest-environment-jsdom-global',
  'roots': [
    '<rootDir>/src'
  ],
  'testMatch': [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  'transform': {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  'moduleNameMapper': {
    '^ui/(.*)$': '<rootDir>/src/ui/$1',
    '^electron/(.*)$': '<rootDir>/src/electron/$1',
    '^domain/(.*)$': '<rootDir>/src/domain/$1',
    '^utility/(.*)$': '<rootDir>/src/utility/$1'
  }
}