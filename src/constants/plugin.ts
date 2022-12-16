import path from "node:path";

const RELATIVE_PLUGIN_PATH = "./plugins";
export const PLUGINS_FOLDER_PATH = path.resolve(
  path.dirname(new URL(__dirname).pathname),
  RELATIVE_PLUGIN_PATH
);
