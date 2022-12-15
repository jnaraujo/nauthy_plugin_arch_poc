import { Response } from "./Commands.ts";
import { User } from "./User.ts";

export abstract class Plugin {
  public abstract name: string;
  public abstract version: string;
  public abstract description: string;

  public abstract permissions: string[];

  public abstract onLoad(): void;
  public abstract onReload(): void;

  public abstract registerCommands(): Command[];
}

export interface Command {
  name: string;
  description: string;
  permissions: string[];
  aliases: string[];
  usage: string;
  execute(message: Message): Response;
}

export interface Message {
  sender: User;

  content: string;
  channelId: string;
}
