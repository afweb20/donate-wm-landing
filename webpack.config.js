const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const supportedLangs = require("./src/scripts/supportedLangs");

module.exports = (env, argv) => {
  return {
    mode: argv.mode,
    entry: {
      "donate-wm-landing": {
        import: "./src/donate-wm-landing.js"
      },
      // "additional-script": {
      //   import: "./src/scripts/additional-script.js"
      // }
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    devServer: {
      allowedHosts: "all",
      static: {
        directory: path.join(__dirname, "./dist"),
      },
      compress: true,
      hot: true,
      port: 80
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader, 
            "css-loader"
          ]
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, 
            "css-loader", 
            "sass-loader"
          ]
        },
        {
          test: /\.(mov|mp4)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/video/[name][ext]",
          },
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[name][ext]",
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name][ext]",
          },
        },
        {
          test: /\.xml$/i,
          use: [
            {
              loader: "raw-loader",
              options: {
                esModule: false,
              },
            },
          ],
        },
        {
          test: /\.hbs?$/,
          use: [
            {
              loader: "handlebars-loader",
              options: {
                inlineRequires: /\/(images|video)\//
              }
            },
            {
              loader: "webpack-ssi-include-loader"
            },
          ],
        },
      ]
    },
    plugins: addPlugins(argv)
  };
};

function addPage(page, lang, chunks=[]) {
  return new HtmlWebpackPlugin({
    favicon: "./favicon.ico",
    filename: page == "index" ? `./${lang}/${page}.html` : `./${lang}/${page}/index.html`,
    template: `./src/pages/${page}.hbs`,
    templateParameters: require(`./src/local/${lang}.json`),
    chunks: ["donate-wm-landing"].concat(chunks)
  });
}

function addMultiLangPage(page, chunks) {
  var arr = [];

  for (let i = 0; i < supportedLangs.length; i++) {
    const lang = supportedLangs[i];
    arr.push(addPage(page, lang, chunks));
  }
  return arr;
}

function addPlugins(argv) {
  var pluginArray = [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      __MODE__: JSON.stringify(argv.mode),
      __SUPPORTED_LANGS__: JSON.stringify(supportedLangs)  
    })
  ];
  pluginArray = pluginArray.concat(addMultiLangPage("index"));
  // pluginArray = pluginArray.concat(addMultiLangPage("additional-page", ["additional-script"]));
  return pluginArray;
}