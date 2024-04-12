module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env",
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      }],
      ["module-resolver", {
        "root": ["./"],
        "alias": {
          "underscore": "lodash",
          "@wipe-pkg": "./packages-test",
          "@comp": "./components",
          "@services": "./services",
          "@endpoint": "./endpoint",
          "@assets": "./assets",
          "@context": "./context",
          "@socket": "./socket",
          "@error": "./error",
        }
      }],
      "react-native-reanimated/plugin",
    ]
  };
};
