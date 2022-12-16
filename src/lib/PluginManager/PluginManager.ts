import { Plugin } from "../../types/Plugin";
import { PluginLoader } from "./PluginLoader";
import { log, logError, logInfo } from "./utils/log";

export class PluginManager {
  private plugins: Plugin[] = [];
  private pluginLoader: PluginLoader;

  private commands: Map<string, Plugin> = new Map();
  private aliases: Map<string, string> = new Map();

  constructor() {
    this.pluginLoader = new PluginLoader();
  }

  public async loadPlugins() {
    this.plugins = await this.pluginLoader.loadPlugins();
  }

  public registerCommands() {
    log("Registering commands.");
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

        log(`Registering aliases for command "${command.name}".`);

        command.aliases.forEach((alias) => {
          if (this.aliases.has(alias)) {
            logError(`Error while registering command "${command.name}":`);
            logInfo(`Alias ${alias} already exists`);
            return;
          }
          this.aliases.set(alias, command.name);
          logInfo(`Alias "${alias}" registered!`);
        });
      });
    });
  }
}
