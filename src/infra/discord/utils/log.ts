import { colours } from "@/constants/colors";

export function log(message: string) {
  console.log(
    `[${colours.fg.cyan}PluginLoader${colours.reset}] ${
      colours.fg.white + message
    }`
  );
}

export function logInfo(message: string) {
  console.info(`${colours.reset}   > ${colours.fg.white + message}`);
}

export function logError(message: string) {
  console.error(
    `${colours.fg.red}[PluginLoader:Error]${
      colours.reset + colours.fg.white
    } ${message}`
  );
}
