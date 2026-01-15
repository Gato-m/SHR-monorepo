const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Atļaujam Metro lasīt kodu no packages/
config.watchFolders = [workspaceRoot];

// Nodrošinām, ka Metro pareizi seko pnpm symlinkiem
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// Aliasu atbalsts
config.resolver.extraNodeModules = {
  "@schema": path.resolve(workspaceRoot, "packages/schema/src"),
  "@ui": path.resolve(workspaceRoot, "packages/ui/src"),
  "@utils": path.resolve(workspaceRoot, "packages/utils/src"),
};

module.exports = config;
