import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import webpack, { type Configuration } from 'webpack';

const root = process.cwd();
const config: Configuration = {
  mode: 'development',
  entry: './src/main.tsx',
  output: {
    path: path.resolve(root, 'dist'),
    filename: 'assets/js/[name].js',
    publicPath: '/',
    clean: true
  },
  devtool: 'eval-cheap-module-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: { '@': path.resolve(root, 'src') }
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [ReactRefreshTypeScript()]
            }),
            compilerOptions: {
              module: 'ESNext',
              jsx: 'react-jsx'
            }
          }
        }
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportLocalsConvention: 'asIs',
                namedExport: false
              }
            }
          }
        ]
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'], exclude: /\.module\.css$/ },
      { test: /\.(png|jpg|jpeg|gif|svg)$/i, type: 'asset', parser: { dataUrlCondition: { maxSize: 10 * 1_024 } } }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html', inject: 'body' }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin({
      overlay: { sockIntegration: 'wds' }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  devServer: {
    port: 5173,
    hot: true,
    liveReload: false,
    compress: false,
    historyApiFallback: true,
    static: {
      directory: path.resolve(root, 'public'),
      publicPath: '/',
      watch: true
    },
    proxy: [
      {
        context: ['/itunes'],
        target: 'https://itunes.apple.com',
        changeOrigin: true,
        secure: true,
        pathRewrite: { '^/itunes': '' },
        headers: {
          'Origin': 'https://itunes.apple.com',
        }
      }
    ],
    devMiddleware: {
      writeToDisk: false
    },
    watchFiles: {
      paths: ['src/**/*', 'public/**/*'],
      options: {
        usePolling: true,
        interval: 500,
        ignored: /node_modules/
      }
    }
  },
  optimization: {
    moduleIds: 'named',
    runtimeChunk: 'single',
    minimize: false
  },
  cache: {
    type: 'memory'
  }
};

export default config;
