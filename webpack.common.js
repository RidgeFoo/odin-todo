const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    filename: '[name]_[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      { test: /\.(svg|json)$/i, type: 'asset/source' },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
};
