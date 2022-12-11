import { Plugin } from "../../types/Plugin.ts";

export default class TestePlugin extends Plugin {
  public name = "Teste";
  public version = "1.0.0";
  public description = "An example plugin";
  public permissions = ["ADMINISTRATOR"];

  public onLoad(): void {
    console.log("Teste plugin loaded");
  }
  public onReload(): void {
    console.log("Teste plugin reloaded");
  }
}
