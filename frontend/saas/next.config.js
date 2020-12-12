const withPlugins = require('next-compose-plugins');
const path = require('path')
const withTM = require('next-transpile-modules')(['@geist-ui/react'])
const withOptimizedImages = require('next-optimized-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins(
  [
    [
      withOptimizedImages,
      {
        optimizeImages: true,
        optimizeImagesInDev: false,
        inlineImageLimit: 8192,
        imagesFolder: 'images',
        imagesName: '[name]-[hash].[ext]',
        handleImages: ['jpeg', 'jpg', 'png', 'svg', 'webp', 'gif'],
        mozjpeg: {
          quality: 90,
        },
        optipng: {
          optimizationLevel: 3,
        },
        webp: {
          preset: 'default',
          quality: 90,
        },
        svgo: {
          // enable/disable svgo plugins here
        },
      },
    ],
    [withBundleAnalyzer],
    [withTM]
  ], {
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
  });