const loaderOverrides = {
  babelLoader: (loader, env, target, paths) => {
    return {
      ...loader,
      options: (env, target, paths) => {
        return loader
          .options(env, target, paths)
          .updateIn(["use", 0, "options", "plugins"], plugins => {
            return plugins.unshift("babel-plugin-transform-decorators-legacy");
          });
      }
    };
  }
};

const pluginOverrides = {
  htmlPlugin: (plugin, env, target, paths) => {
    return plugin;
  }
};

const overrideLoader = (loader, env, target, paths) => {
  return loaderOverrides[loader.name()]
    ? loaderOverrides[loader.name()](loader, env, target, paths)
    : loader;
};

const overridePlugin = (plugin, env, target, paths) => {
  return pluginOverrides[plugin.name()]
    ? pluginOverrides[plugin.name()](plugin, env, target, paths)
    : plugin;
};

const overrideWebpackConfiguration = (base, env, target, paths) => {
  return base;
};

module.exports = {
  overrideLoader,
  overridePlugin,
  overrideWebpackConfiguration
};
