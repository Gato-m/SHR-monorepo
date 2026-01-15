// Set the EXPO_ROUTER_APP_ROOT for expo-router BEFORE any requires
process.env.EXPO_ROUTER_APP_ROOT = './app';

const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch folders for monorepo
config.watchFolders = [workspaceRoot];

// Node modules paths for pnpm
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

module.exports = config;
