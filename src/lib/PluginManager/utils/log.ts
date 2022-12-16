import { colours } from "@/constants/colors";

export function log(message: string) {
  console.log(
    colours.fg.cyan,
    `[PluginLoader]`,
    colours.reset,
    colours.fg.white,
    `${message}`
  );
}

export function logInfo(message: string) {
  // console.info(`%c   > ${message}`, "color: #e3e3e3");
  console.info(`   > `, colours.fg.white, `${message}`);
}

export function logError(message: string) {
  // console.error(
  //   `%c[PluginLoader]%c ${message}`,
  //   "color: #f53d4c; font-weight: bold",
  //   "color: #fff"
  // );
  console.error(
    colours.fg.cyan,
    `[PluginLoader]`,
    colours.reset,
    colours.fg.red,
    `${message}`
  );
}
