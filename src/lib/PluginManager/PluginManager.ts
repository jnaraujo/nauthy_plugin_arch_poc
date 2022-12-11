import { Plugin } from "../../types/Plugin.ts";
import { PluginLoader } from "./PluginLoader.ts";
import { log, logError, logInfo } from "./utils/log.ts";

export class PluginManager {
  private plugins: Plugin[] = [];
  private pluginLoader: PluginLoader;

  private commands: Map<string, Plugin> = new Map();

  constructor() {
    this.pluginLoader = new PluginLoader();
  }

  public async loadPlugins() {
    this.plugins = await this.pluginLoader.loadPlugins();
  }

  public registerCommands() {
    log("Registering commands...");
    this.plugins.forEach((plugin) => {
      const pluginCommands = plugin.registerCommands();

      pluginCommands.forEach((command) => {
        log(
          `Registering command "${command.name}" from plugin "${plugin.name}"`
        );
        if (this.commands.has(command.name)) {
          logError(`Error while registering command "${command.name}":`);
          logInfo(`Command ${command.name} already exists`);
          return;
        }
        this.commands.set(command.name, plugin);
        logInfo(`Command "${command.name}" registered!`);
      });
    });
  }
}
