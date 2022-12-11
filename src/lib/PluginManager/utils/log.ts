export function log(message: string) {
  console.log(
    `%c[PluginLoader]%c ${message}`,
    "color: #00bfff; font-weight: bold",
    "color: #fff"
  );
}

export function logInfo(message: string) {
  console.info(`%c   > ${message}`, "color: #e3e3e3");
}

export function logError(message: string) {
  console.error(
    `%c[PluginLoader]%c ${message}`,
    "color: #f53d4c; font-weight: bold",
    "color: #fff"
  );
}
