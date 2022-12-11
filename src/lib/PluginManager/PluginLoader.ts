import { PLUGINS_FOLDER_PATH } from "../../constants/plugin.ts";
import { Plugin } from "../../types/Plugin.ts";
import { log, logError, logInfo } from "./utils/log.ts";

export class PluginLoader {
  private plugins: Plugin[] = [];

  public async loadPlugins() {
    log(PLUGINS_FOLDER_PATH);
    log("Loading plugins...");
    const pluginFiles = Deno.readDirSync(PLUGINS_FOLDER_PATH);

    for (const file of pluginFiles) {
      try {
        const loadedPlugin = (
          await import(`file:\\${PLUGINS_FOLDER_PATH}/${file.name}/index.ts`)
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
        logError(error);
      }
    }

    return this.plugins;
  }
}
