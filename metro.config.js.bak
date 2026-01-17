const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '.');

const config = getDefaultConfig(projectRoot);

// Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// Resolve node_modules properly for monorepo
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Set the app directory to prombutne
config.resolver.sourceExts = [...config.resolver.sourceExts, 'tsx', 'ts', 'jsx', 'js'];

// Add path alias resolution
config.resolver.extraNodeModules = {
  '@': path.resolve(projectRoot, 'apps'),
  '@schema': path.resolve(projectRoot, 'packages/schema/src'),
  '@ui': path.resolve(projectRoot, 'packages/ui/src'),
  '@utils': path.resolve(projectRoot, 'packages/utils/src'),
};

// Set the app directory for expo-router
config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
};

module.exports = config;
