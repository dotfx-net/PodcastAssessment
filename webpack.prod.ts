import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
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
  devtool: false,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: { '@': path.resolve(process.cwd(), 'src') }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: { transpileOnly: true, compilerOptions: { sourceMap: false } }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: false } }
        ]
      },
      { test: /\.(png|jpg|jpeg|gif|svg)$/i, type: 'asset', parser: { dataUrlCondition: { maxSize: 10 * 1_024 } } }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html', minify: false })
  ],
  optimization: {
    splitChunks: { chunks: 'all' },
    runtimeChunk: 'single',
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: { format: { comments: false } }
      }),
      new CssMinimizerPlugin({
        minimizerOptions: { preset: ['default', { discardComments: { removeAll: true } }] }
      })
    ]
  },
  performance: { hints: false }
};

export default config;
