import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import merge from 'merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { List } from 'immutable';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { getStyleLoader } from './src/utils/webpack';
import pkg from './package.json';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';
import {
  processCommonLoaders,
  processEnvLoaders,
  processCommonPlugins,
  processEnvPlugins
} from './src/config/webpack';

import dotenv from 'dotenv';
dotenv.config();

const ENV = process.env.NODE_ENV;

const PATHS = {
  src: path.resolve(__dirname, './src'),
  build: path.resolve(__dirname, './dist'),
  modules: path.resolve(__dirname, './node_modules'),
  test: path.resolve(__dirname, './test'),
};

export function getCommonLoaders() {
  const commonLoaders = List([
    getStyleLoader(
      ENV,
      'browser',
      {
        test: /\.pcss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ),
    getStyleLoader(
      ENV,
      'browser',
      {
        test: /\.css$/,
        include: [
          PATHS.modules,
        ],
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 2,
            },
          },
        ],
      },
    ),
    {
      test: /\.(png|jpg|gif|ico|svg)$/,
      include: [
        PATHS.src,
      ],
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name]-[hash].[ext]',
          },
        },
        {
          loader: 'img-loader',
          options: {
            enabled: ENV === 'production'
          },
        },
      ],
    },
    {
      test: /font.*\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      include: [
        PATHS.src,
        PATHS.modules,
      ],
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[path][name]-[hash].[ext]',
        },
      }],
    },
    {
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader'
      }],
      exclude: [
        PATHS.modules,
      ],
    },
  ]);
  return processCommonLoaders(commonLoaders);
}

const common = {
  context: path.join(__dirname, 'src'),
  resolve: {
    modules: [
      PATHS.src,
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
};

export function getCommonPlugins() {
  const commonPlugins = List.of(
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(PATHS.modules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: process.env.NODE_ENV === 'development',
      __DEVTOOLS__: false,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.API': JSON.stringify(process.env.API),
    }),
    new CopyWebpackPlugin([
      { from: 'assets/web/*.*', flatten: true },
    ]),
    new HtmlWebpackPlugin({
      title: 'Hardcorest React App',
      template: 'assets/index.html',
      favicon: 'assets/favicon.ico',
      inject: 'body',
      chunksSortMode: 'dependency',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[chunkhash].js',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'meta',
      chunks: ['vendor'],
      filename: 'meta.[hash].js',
    })
  );

  return processCommonPlugins(commonPlugins);
}

const envs = {
  test: {
    module: {
      rules: processEnvLoaders(
        'test',
        getCommonLoaders()
      ).toJS()
    },
    devtool: '#inline-source-map',
  },

  development: {
    module: {
      rules: processEnvLoaders(
        'development',
        getCommonLoaders()
      ).toJS()
    },
    devtool: '#eval-source-map',
    entry: {
      client: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './client.js',
      ],
      vendor: [
        // 'babel-polyfill' // de-comment if polyfill is needed
      ].concat(
        Object.keys(pkg.dependencies),
      ),
    },
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: 'client.[chunkhash].js',
    },
    plugins: processEnvPlugins(
      'development',
      getCommonPlugins().concat([
        new webpack.HotModuleReplacementPlugin(),
      ])
    ).toJS(),
  },
  production: {
    module: {
      rules: processEnvLoaders(
        'production',
        getCommonLoaders()
      ).toJS()
    },
    devtool: 'source-map',
    entry: {
      client: [
        './client.js',
      ],
      vendor: [
        // 'babel-polyfill' // de-comment if polyfill is needed
      ].concat(
        Object.keys(pkg.dependencies),
      ),
    },

    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].[chunkhash].js',
    },
    plugins: processEnvPlugins(
      'production',
      getCommonPlugins().concat([
        new webpack.optimize.UglifyJsPlugin({
          mangle: false,
          compress: {
            dead_code: true,
            unsafe: false,
            unused: false,
            hoist_vars: false,
            side_effects: false,
            global_defs: {},
          },
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new WebpackAssetsManifest({
          output: 'manifest.json',
          writeToDisk: true,
          sortManifest: true,
          merge: true,
        }),
      ])
    ).toJS(),
  },
};

export default merge(common, envs[ENV]);
