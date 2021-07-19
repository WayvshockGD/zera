import Eris = require("eris");
import Zera = require("./lib/Zera");

export type colors = "BLUE" | "GREEN" | "RED" | "ORANGE" | "YELLOW" | "PURPLE";

export interface config {
    config: {
        beta: boolean;
        owners: Array<string>;
        prefix: {
            betaPrefix: string;
            botPrefix: string;
        };
        token: {
            betaToken: string;
            botToken: string;
        }
    }
}

export interface caches<T extends string> {
    commands: Map<T, botCommand>;
    plugins: Map<T, botPlugin>;
    subCommands: Map<T, botSubCommand>;
} 


export type execute = ({}: ctx) => void;

export interface botPlugin {
    name: string;
    desc: string;
    enabled: boolean;
    commands: botCommand[];
}

export interface subCommandBuilder {
    name: string;
    enabled: boolean;
}

export interface botCommand {
    name: string;
    desc: string;
    permission?: string;
    subCommands?: subCommandBuilder[];
    owner?: boolean;
    guildOnly?: boolean;
    [key: string]: any;
}

export interface botSubCommand {
    name: subCommandBuilder;
    enabled: boolean;
    [key: string]: any;
}

export interface ctx {
    args: string[];
    message: Eris.Message;
    client: Zera;
    guild: Eris.Guild;
}