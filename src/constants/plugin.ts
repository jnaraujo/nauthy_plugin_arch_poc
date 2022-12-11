const RELATIVE_PLUGIN_PATH = "./../plugins";
export const PLUGINS_FOLDER_PATH = Deno.realPathSync(
  new URL(RELATIVE_PLUGIN_PATH, import.meta.url)
);
