import Eris = require("eris");
import LavaServer = require("./lib/LavaServer");
import Zera = require("./lib/Zera");

export type colors = "BLUE" | "GREEN" | "RED" | "ORANGE" | "YELLOW" | "PURPLE";

export interface config {
    config: {
        beta: boolean;
        ts_node: boolean;
        clientID: string;
        owners: Array<string>;
        prefix: {
            betaPrefix: string;
            botPrefix: string;
        };
        token: {
            betaToken: string;
            botToken: string;
        }
        lavalink: {
            host: string;
            port: number;
            password: string;
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
    desc: boolean;
    [key: string]: any;
}

export interface botCommand {
    name: string;
    desc: string;
    subCommands?: subCommandBuilder[];
    owner?: boolean;
    guildOnly?: boolean;
    permissions?: string[];
    [key: string]: any;
}

export interface botSubCommand {
    command: subCommandBuilder;
    enabled: boolean;
    [key: string]: any;
}

export interface ctx {
    args: string[];
    message: Eris.Message;
    client: Zera;
    guild: Eris.Guild;
    player: LavaServer;
}