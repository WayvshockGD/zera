import Eris from "eris"
import { colors } from "../Context";

export = class MessageEmbed {
    private options: Eris.EmbedOptions;

    constructor(options: Eris.EmbedOptions) {
        this.options = {
            title: "",
            description: "",
            color: undefined,
            fields: [],
            footer: undefined,
            author: undefined,
            thumbnail: undefined
        };
    }

    setTitle(title: string) {
        this.options.title = title;
        return this;
    }

    setDescription(desc: string) {
        this.options.description = desc;
        return this;
    }

    setFields(fields: Eris.EmbedField[]) {
        this.options.fields = fields;
        return this;
    }

    setColor(color: colors) {
        let colorTree = {
            RED: 0xCB0E36,
            ORANGE: 0xff7d45,
            YELLOW: 0xfff645,
            GREEN: 0x45ff4b,
            BLUE: 0x4580ff,
            PURPLE: 0xda45ff
        }

        this.options.color = colorTree[color];
        return this;
    }

    setFooter(footer: Eris.EmbedFooter) {
        this.options.footer = footer;
        return this;
    }

    setAuthor(author: Eris.EmbedAuthor) {
        this.options.author = author;
        return this;
    }

    setImage(opts: Eris.EmbedImage) {
        this.options.image = opts;
        return this;
    }

    setThumbnail(opts: { url: string }) {
        this.options.thumbnail = opts;
        return this;
    }

    create() {
        return this.options;
    }
}