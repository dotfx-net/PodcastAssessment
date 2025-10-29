import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'development',
  entry: './src/main.tsx',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'assets/js/bundle.js',
    clean: true
  },
  devtool: 'eval-cheap-module-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg|jpeg|gif|svg)$/i, type: 'asset', parser: { dataUrlCondition: { maxSize: 10 * 1_024 } } }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' })
  ],
  devServer: {
    port: 5173,
    //open: true,
    hot: true,
    compress: false, // no gzip in dev env
    static: [
      { directory: path.resolve(process.cwd(), 'public'), publicPath: '/' }
    ],
    client: { overlay: true },
    historyApiFallback: true
  },
  optimization: {
    minimize: false // no minimize in dev env
  }
};

export default config;
