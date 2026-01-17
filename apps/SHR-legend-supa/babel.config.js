module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: '../../packages/assets',
            components: '../../packages/components',
            electric: '../../packages/electric',
            hooks: '../../packages/hooks',
            lib: '../../packages/lib',
            schema: '../../packages/schema',
            theme: '../../packages/theme',
            ui: '../../packages/ui',
            utils: '../../packages/utils',
          },
        },
      ],
    ],
  };
};
