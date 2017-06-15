var path = require('path')
var webpack = require('webpack')

const config = {
  devtool: 'cheap-module-source-map',
  resolve: {
    alias: {
      components: path.resolve(__dirname + "/src/components"),
      actions: path.resolve(__dirname + "/src/actions"),
      websocket: path.resolve(__dirname + "/src/websocket"),
      services: path.resolve(__dirname + "/src/services"),
      constants: path.resolve(__dirname + "/src/constants"),
      root: path.resolve(__dirname + "/src/"),
    }
  },
  entry: [
    'babel-polyfill',
    './src/index', './css/style.css', './css/flex.css',
  ],
  watch: true,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  ],
  module: {
   rules: [
     {
      test: /\.(js|jsx)$/,
      include: [
        path.resolve(__dirname, "src"),
      ],
      exclude: /node_modules/,
      use: [
        'babel-loader'
      ]
    },
    {
      test: /\.css$/,
      use: [
         {
           loader: "style-loader"
         },
         {
           loader: "css-loader"
         }
        ]
      },
      {
  test: /\.svg$/,
  use: [
    {
      loader: 'babel-loader'
    },
    {
      loader: 'react-svg-loader',
      query: {
        svgo: {
          jsx: true
        }
      }
    }
  ]
}
    ]
  }
}
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
}
module.exports = config
