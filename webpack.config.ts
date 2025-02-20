/* eslint-disable import-x/namespace */
/* eslint-disable import-x/no-nodejs-modules */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import CircularDependencyPlugin from 'circular-dependency-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import NodemonPlugin from 'nodemon-webpack-plugin';
import * as path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import * as webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import WebpackBar from 'webpackbar';

module.exports = function (_env: any, argv: any): webpack.Configuration {
  const isDevelopment = argv.mode === 'development';

  return {
    target: 'node',
    devtool: isDevelopment ? 'source-map' : false,
    externals: [nodeExternals()],

    entry: {
      main: './src/main.ts',
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.ts', '.js'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: './tsconfig.json',
        }),
      ],
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: isDevelopment,
                configFile: 'tsconfig.build.json',
                getCustomTransformers: (program: any) => ({
                  before: [
                    require('@nestjs/swagger/plugin').before(
                      {
                        classValidatorShim: true,
                        introspectComments: true,
                        dtoFileNameSuffix: ['.dto.ts', '.entity.ts', '.model.ts'],
                      },
                      program,
                    ),
                  ],
                }),
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },

    optimization: {
      minimize: !isDevelopment,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
            compress: {
              drop_console: !isDevelopment,
            },
          },
          extractComments: false,
        }),
      ],
    },

    plugins: [
      ...(isDevelopment ? [new webpack.HotModuleReplacementPlugin()] : []),
      new CleanWebpackPlugin(),
      // Progress bar and build stats
      new WebpackBar({
        name: isDevelopment ? 'Development' : 'Production',
        color: isDevelopment ? '#f7b93e' : '#00b300',
      }),
      // Type checking in a separate process
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: 'tsconfig.build.json',
        },
      }),
      // Detect circular dependencies
      new CircularDependencyPlugin({
        exclude: /node_modules|src\/.*\.(model|entity|dto)\.ts$/,
        include: /src\/.*\.ts$/,
        failOnError: !isDevelopment,
        allowAsyncCycles: false,
        cwd: process.cwd(),
      }),
      // Auto-restart server in development
      ...(isDevelopment
        ? [
            new NodemonPlugin({
              script: './dist/main.js',
              watch: ['./dist'],
              ext: 'js',
              verbose: true,
            }),
          ]
        : []),
      // Add to plugins array:
      new Dotenv({
        systemvars: true,
        safe: true,
      }),
      // Copy static assets
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './src/assets'),
            to: './src/assets',
            noErrorOnMissing: true,
          },
        ],
      }),
    ],

    watch: isDevelopment,
    watchOptions: {
      ignored: /node_modules|dist/,
    },
  };
};
