import { Command, Message, Plugin } from "../../types/Plugin.ts";

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

  public registerCommands(): Command[] {
    return [
      {
        name: "teste",
        description: "Teste command",
        permissions: ["ADMINISTRATOR"],
        aliases: ["t"],
        usage: "teste",
        execute: (message: Message, args: string[]) => {
          console.log("Teste command executed: ", message, args);
        },
      },
      {
        name: "teste",
        description: "Teste command",
        permissions: ["ADMINISTRATOR"],
        aliases: ["t"],
        usage: "teste",
        execute: (message: Message, args: string[]) => {
          console.log("Teste command executed: ", message, args);
        },
      },
      {
        name: "teste2",
        description: "Teste command",
        permissions: ["ADMINISTRATOR"],
        aliases: ["t"],
        usage: "teste",
        execute: (message: Message, args: string[]) => {
          console.log("Teste command executed: ", message, args);
        },
      },
    ];
  }
}
