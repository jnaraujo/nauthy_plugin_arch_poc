import { Command, Message } from "@/types/Plugin";
import * as Eris from "eris";
import { log } from "./utils/log";

export class Discord {
  private client: Eris.Client;
  private _commands: Map<string, Command> = new Map();

  constructor(token: string) {
    log("Connecting to Discord...");

    const eris = new Eris.Client(token, {
      intents: [],
    });

    this.client = eris;

    this.client.on("error", (err) => {
      console.error(err);
    });
    this.client.on("ready", this.onReady.bind(this));
    this.client.on("interactionCreate", this.onInteraction.bind(this));
  }

  public async onReady() {
    log("Connected to Discord!");

    this.client.editStatus("idle", {
      name: "with your feelings",
    });

    for (const [name, command] of this._commands) {
      await this.client.createGuildCommand(
        process.env.DISCORD_GUILD_ID as string,
        {
          name: command.name,
          description: command.description,
          type: 1,
        }
      );

      log(`Registered command ${name}`);
    }
  }

  public setCommands(commands: Map<string, Command>) {
    this._commands = commands;
  }

  private async onInteraction(
    interaction: Eris.CommandInteraction
  ): Promise<void> {
    const command = this._commands.get(interaction.data.name);

    if (!command) {
      return interaction.createMessage("Command not found");
    }

    const message: Message = {
      sender: {
        name: interaction.member?.user.username || "Unknown",
        id: String(interaction.user?.id),
        email: "Unknown",
        picture: interaction.member?.user.avatarURL || "Unknown",
      },
      channelId: interaction.channel.id,
      content: "test",
    };

    const response = await command.execute(message);

    interaction.createMessage(response.text);
  }

  public async connect(): Promise<void> {
    await this.client.connect();
  }
}
