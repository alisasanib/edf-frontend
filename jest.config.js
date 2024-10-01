export default {
  type: "module",
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss|svg)$": "jest-css-modules-transform",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
