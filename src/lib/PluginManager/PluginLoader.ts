import fs from "node:fs";
import { PLUGINS_FOLDER_PATH } from "../../constants/plugin";
import { Plugin } from "../../types/Plugin";
import { log, logError, logInfo } from "./utils/log";

export class PluginLoader {
  private plugins: Plugin[] = [];

  public async loadPlugins() {
    log(PLUGINS_FOLDER_PATH);
    log("Loading plugins...");
    const pluginFiles = fs.readdirSync(PLUGINS_FOLDER_PATH, {
      withFileTypes: true,
    });

    for (const file of pluginFiles) {
      try {
        const loadedPlugin = (
          await import(`${PLUGINS_FOLDER_PATH}/${file.name}`)
        ).default;

        const pluginInstance: Plugin = new loadedPlugin();

        if (pluginInstance instanceof Plugin) {
          this.plugins.push(pluginInstance);
          log(`Loaded plugin: ${pluginInstance.name}`);
          logInfo(`Version: ${pluginInstance.version}`);
          logInfo(`Description: ${pluginInstance.description}`);
          logInfo(`Permissions: ${pluginInstance.permissions.join(", ")}`);

          pluginInstance.onLoad();
        } else {
          throw new Error(`${file.name} is not a valid plugin`);
        }
      } catch (error) {
        logError(`Failed to load plugin: ${file.name}`);
        logError(error as string);
      }
    }

    return this.plugins;
  }
}
