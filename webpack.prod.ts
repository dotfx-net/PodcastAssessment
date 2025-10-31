import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import webpack, { type Configuration } from 'webpack';

const config: Configuration = {
  mode: 'production',
  entry: './src/main.tsx',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'assets/js/[name].[contenthash:8].js',
    chunkFilename: 'assets/js/[name].[contenthash:8].js',
    assetModuleFilename: 'assets/media/[name].[contenthash:8][ext]',
    publicPath: '/',
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
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64:6]',
                exportLocalsConvention: 'asIs',
                namedExport: false
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: false } }
        ],
        exclude: /\.module\.css$/
      },
      { test: /\.(png|jpg|jpeg|gif|svg)$/i, type: 'asset', parser: { dataUrlCondition: { maxSize: 10 * 1_024 } } }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html', minify: false }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    })
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
