import { User } from "./User.ts";

export abstract class Plugin {
  public abstract name: string;
  public abstract version: string;
  public abstract description: string;

  public abstract permissions: string[];

  public abstract onLoad(): void;
  public abstract onReload(): void;
}

export interface Message {
  sender: User;

  content: string;
  channelId: string;
}

export interface Interactions {
  onCommand(command: string, args: string[], message: Message): void;
}
