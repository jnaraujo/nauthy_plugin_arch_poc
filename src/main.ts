import { PluginLoader } from "./lib/PluginManager/PluginLoader.ts";

const pluginLoader = new PluginLoader();
await pluginLoader.loadPlugins();
