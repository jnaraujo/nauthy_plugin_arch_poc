import Eris from "eris";

export class Discord {
  private client: Eris.Client;
  constructor(private token: string) {
    const eris = new Eris(this.token, {
      intents: [],
      requestTimeout: 10000, // 10 seconds
    });

    this.client = eris;

    this.client.on("error", (err) => {
      console.error(err);
    });
    // this.client.on("ready", this.onReady);
    // this.client.on("interactionCreate", this.onInteraction);
  }

  public onReady() {
    console.log("!!!!!!!!!!!!!! Bot ready!");
  }

  private async onInteraction(
    interaction: Eris.CommandInteraction
  ): Promise<void> {
    console.log(interaction);
  }

  public async connect(): Promise<void> {
    await this.client.connect();
  }
}
