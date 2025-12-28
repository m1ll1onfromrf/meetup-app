plugins: [
  [
    'module-resolver',
    {
      alias: {
        'src': './src', // Теперь можно: import ... from 'src/services/...'
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  ],
]
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
