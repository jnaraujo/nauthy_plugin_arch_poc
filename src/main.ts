import { PluginManager } from "./lib/PluginManager";
import { Discord } from "./infra/discord/index";

async function init() {
  const pluginManager = new PluginManager();
  await pluginManager.loadPlugins();
  pluginManager.registerCommands();

  const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

  if (!DISCORD_TOKEN) {
    throw new Error("DISCORD_TOKEN not found");
  }

  const client = new Discord(DISCORD_TOKEN);
  await client.connect();
}

init();
