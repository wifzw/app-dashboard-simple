module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    devtool: 'source-map',
  },
  filenameHashing: true,
  assetsDir: 'public',
  outputDir: 'dist',
  runtimeCompiler: true,
  devServer: {
    host: '0.0.0.0',
    port: 8081,
  },
};
