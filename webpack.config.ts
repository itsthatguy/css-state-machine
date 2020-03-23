import { resolve } from 'path';
import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import * as ProgressBarPlugin from 'progress-bar-webpack-plugin';
import { CheckerPlugin } from 'awesome-typescript-loader';

declare var process;
declare var __dirname;

const app = {
  devtool: 'cheap-module-eval-source-map',
  entry: './__tests__/fixtures/index.ts',
  output: {
    publicPath: '/',
    path: resolve(__dirname, 'dist', 'app'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  },
  devServer: {
    compress: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    inline: true,
    port: 3001,
  },
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   exclude: /(node_modules)/,
      //   use: {
      //     loader: resolve(__dirname, './src/i18n-json-webpack-loader.ts'),
      //     options: {
      //       translationFunction: 't'
      //     }
      //   }
      // },
      {
        test: /\.tsx?$/,
        loader: ['babel-loader', 'awesome-typescript-loader'],
        exclude: [/(node_modules)/],
      },
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.NamedModulesPlugin(),
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '__tests__/fixtures/index.html',
      inject: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:
          process.env.NODE_ENV === 'production'
            ? JSON.stringify('production')
            : JSON.stringify('development'),
      },
    }),
    new ProgressBarPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['./__tests__/fixtures/', 'node_modules/'],
  }
};

export default app;
