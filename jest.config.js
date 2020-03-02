module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)'],
  testPathIgnorePatterns: ['<rootDir>/__tests__/helpers'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  }
};
