'use strict'
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, '..', dir)
  }
module.exports = {
    outputDir: 'docs',
    baseUrl: process.env.NODE_ENV === 'production'
      ? ''
      : '/',
      chainWebpack: (config) => {
        const svgRule = config.module.rule('svg');
     
        svgRule.uses.clear();
     
        svgRule
        .test(/\.svg$/)
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
              include: [resolve('src/icons')],
            symbolId: 'icon-[name]'
          });
      },
  }