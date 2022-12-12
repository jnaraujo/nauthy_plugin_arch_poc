export enum CommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP,
  STRING,
  INTEGER,
  BOOLEAN,
  USER,
  CHANNEL,
  ROLE,
  MENTIONABLE,
  NUMBER,
  ATTACHMENT,
}

export enum Locales {
  EN_US = "en-US",
  PT_BR = "pt-BR",
  ES_ES = "es-ES",
  FR_FR = "fr-FR",
  DE_DE = "de-DE",
  RU_RU = "ru-RU",
  ZH_CN = "zh-CN",
  ZH_TW = "zh-TW",
  JA_JP = "ja-JP",
  KO_KR = "ko-KR",
}

export interface CommandOptionChoice {
  name: string;
  name_localizations?: Record<Locales, string>;
  value: string | number;
}

export interface CommandOption {
  name: string;
  name_localizations?: Record<Locales, string>;
  description: string;
  description_localizations?: Record<Locales, string>;

  required?: boolean;
  choices: CommandOptionChoice[];
}
