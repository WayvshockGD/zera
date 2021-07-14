import chalk from "chalk";

export = class Logger {

    private format() {
        return `[${new Date().toISOString()}]`;
    }

    public success(...content: string[]) {
        console.log(`${this.format()} ${chalk.green(content)}`);
    }

    public warn(...content: string[]) {
        console.log(`${this.format()} ${chalk.yellow(content)}`);
    }

    public error(...content: string[]) {
        console.log(`${this.format()} ${chalk.red(content)}`);
    }

    public unknown(...content: string[]) {
        console.log(`${this.format()} ${content.join(", ")}`);
    }

    public died(...content: string[]) {
        console.log(`${this.format()} ${chalk.bgRed(content)}`);
    }
}