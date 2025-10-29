import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'production',
  entry: './src/main.tsx',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'assets/js/[name].[contenthash:8].js',
    chunkFilename: 'assets/js/[name].[contenthash:8].js',
    assetModuleFilename: 'assets/media/[name].[contenthash:8][ext]',
    clean: true
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg|jpeg|gif|svg)$/i, type: 'asset', parser: { dataUrlCondition: { maxSize: 10 * 1024 } } }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html', minify: true })
  ],
  optimization: {
    splitChunks: { chunks: 'all' },
    runtimeChunk: 'single',
    minimize: true
  },
  performance: { hints: false }
};

export default config;
