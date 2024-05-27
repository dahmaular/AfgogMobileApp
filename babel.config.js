module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json',
          '.svg',
          '.png',
        ],
        alias: {
          '@': './src',
          '@/components': './src/components',
          '@/assets': './src/assets',
          '@/theme': './src/theme',
          '@/screens': './src/screens',
        },
      },
    ],
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanFaces'],
      },
    ],
  ],
};
