module.exports = (api) => {
  const presets = [
    ['@babel/preset-env', { useBuiltIns: 'entry' }],
    '@babel/preset-react',
    'airbnb',
  ];
  const plugins = ['react-hot-loader/babel', '@babel/plugin-proposal-class-properties'];

  api.cache(true);

  return {
    presets,
    plugins,
  };
};
