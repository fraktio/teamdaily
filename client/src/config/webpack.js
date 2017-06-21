import BabiliPlugin from 'babili-webpack-plugin';

export function processCommonLoaders(loaders) {
  return loaders;
}

export function processEnvLoaders(env, loaders) {
  return loaders;
}

export function processCommonPlugins(plugins) {
  return plugins;
}

export function processEnvPlugins(env, plugins) {

  return plugins;

  if (env === 'production') {
    return plugins.update(-3, plugin => {
      return new BabiliPlugin();
    });
  }

  return plugins;
}
