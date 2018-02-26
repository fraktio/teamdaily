const path = require("path");
// const util = require("util");
const {
  pipe,
  ensureFiles,
  defaultFeatures,
  defaultPaths,
  defaultBaseConfig,
  removeFeature,
  compile,
  override,
  run,
  toJS
} = require("@dr-kobros/broilerplate");

const dotenv = require("dotenv");
dotenv.config();

const { Map } = require("immutable");

module.exports = target => {
  const env = process.env.NODE_ENV;

  const config = pipe(
    defaultPaths(env, target, __dirname),
    defaultBaseConfig(env, target),
    defaultFeatures,
    removeFeature("serverRenderFeature"),
    ensureFiles(false),
    compile(env, target),
    override(path.join(__dirname, "./src/config/overrides")),
    run,
    toJS
  )(Map());

  //console.log("config", util.inspect(config, { depth: 666 }));
  // process.exit();

  return config;
};
