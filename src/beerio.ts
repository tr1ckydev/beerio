import CallableInstance from "callable-instance";
import Modifier from "./modifier";

export default class BeerioAPI extends CallableInstance<[string], Modifier> {
    raw_html: string;
    readonly rewriter: HTMLRewriter = new HTMLRewriter();
    private readonly modifier: Modifier = new Modifier(this);
    constructor(raw_html: string) {
        super("select");
        this.raw_html = raw_html;
    }
    select(selector: string): Modifier {
        this.modifier.selector = selector;
        return this.modifier;
    }
    html() {
        return this.raw_html;
    }
}