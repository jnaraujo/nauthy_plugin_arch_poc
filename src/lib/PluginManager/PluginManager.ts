import { cloneDeep } from "lodash";
import { Command, Plugin } from "../../types/Plugin";
import { PluginLoader } from "./PluginLoader";
import { log, logError, logInfo } from "./utils/log";

export class PluginManager {
  private plugins: Plugin[] = [];
  private pluginLoader: PluginLoader;

  private _commands: Map<string, Command> = new Map();
  private _aliases: Map<string, string> = new Map();

  public get commands() {
    return this._commands;
  }

  public set commands(commands: Map<string, Command>) {
    this._commands = commands;
  }

  public get aliases() {
    return cloneDeep(this._aliases);
  }

  public set aliases(aliases: Map<string, string>) {
    this._aliases = aliases;
  }

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
        this.commands.set(command.name, command);
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
