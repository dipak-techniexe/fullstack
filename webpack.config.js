module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module:{
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      { test: /\.js?/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json?/, loader: 'json-loader', exclude: /node_modules/ },
      //{ test: /\.(scss|css)$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader', options: { sourceMap: true}}, { loader: 'sass-loader', options: { sourceMap: true}}, {loader:'postcss-loader'}], exclude: /node_modules/ },// }
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      }
    ]
  }
};