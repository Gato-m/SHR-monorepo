const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Enable symlinks
config.resolver.unstable_enableSymlinks = true;

// Add extra node modules resolution
config.resolver.extraNodeModules = {
  packages: path.resolve(workspaceRoot, 'packages'),
  '@shr/ui': path.resolve(workspaceRoot, 'packages/ui'),
};

module.exports = config;
