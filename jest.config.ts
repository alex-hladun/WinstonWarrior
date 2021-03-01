module.exports = async () => {
  return {
    modulePathIgnorePatterns: [
      "<rootDir>/build",
      "<rootDir/backend",
      "/backend"
    ]
  };
};
