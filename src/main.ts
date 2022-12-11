import { PluginManager } from "./lib/PluginManager/index.ts";

const pluginManager = new PluginManager();
await pluginManager.loadPlugins();
pluginManager.registerCommands();
