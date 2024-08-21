module.exports = {
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
    },
    testEnvironment: 'jsdom',
  };