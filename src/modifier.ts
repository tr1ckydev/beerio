import BeerioAPI from "./beerio";

export default class Modifier {
    private readonly beerio: BeerioAPI;
    selector: string = "";
    constructor(beerio: BeerioAPI) {
        this.beerio = beerio;
    }
    attr(name: string): string | undefined;
    attr(name: string, value: string): void;
    attr(name: string, value?: string) {
        if (value) {
            this.beerio.raw_html = this.beerio.rewriter.on(this.selector, {
                element(element) {
                    element.setAttribute(name, value);
                }
            }).transform(this.beerio.raw_html);
        } else {
            var attr_buffer: string | undefined = undefined;
            this.beerio.rewriter.on(this.selector, {
                element(element) {
                    if (!attr_buffer) attr_buffer = element.getAttribute(name) ?? undefined;
                }
            }).transform(this.beerio.raw_html);
            return attr_buffer;
        }
    }
    data(name: string): string | undefined;
    data(name: string, value: string): void;
    data(name: string, value?: string) {
        //@ts-ignore
        return this.attr("data-" + name, value);
    }
    removeAttr(name: string) {
        this.beerio.raw_html = this.beerio.rewriter.on(this.selector, {
            element(element) {
                element.removeAttribute(name);
            }
        }).transform(this.beerio.raw_html);
    }
    addClass(className: string) {
        this.beerio.raw_html = this.beerio.rewriter.on(this.selector, {
            element(element) {
                const current_class = element.getAttribute("class");
                if (current_class) {
                    if (!current_class.includes(className)) element.setAttribute("class", current_class + " " + className);
                } else {
                    element.setAttribute("class", className);
                }
            }
        }).transform(this.beerio.raw_html);
    }
    removeClass(className: string) {
        this.beerio.raw_html = this.beerio.rewriter.on(this.selector, {
            element(element) {
                const current_class = element.getAttribute("class");
                if (current_class) {
                    element.setAttribute("class", current_class.replace(className, "").trim());
                }
            }
        }).transform(this.beerio.raw_html);
    }
    toggleClass(className: string) {
        this.beerio.raw_html = this.beerio.rewriter.on(this.selector, {
            element(element) {
                const current_class = element.getAttribute("class");
                if (current_class) {
                    if (current_class.includes(className)) {
                        element.setAttribute("class", current_class.replace(className, "").trim());
                    } else {
                        element.setAttribute("class", current_class + " " + className);
                    }
                } else {
                    element.setAttribute("class", className);
                }
            }
        }).transform(this.beerio.raw_html);
    }
    hasClass(className: string) {
        var has_class = false;
        this.beerio.rewriter.on(this.selector, {
            element(element) {
                const current_class = element.getAttribute("class");
                if (current_class && current_class.includes(className)) {
                    has_class = true;
                }
            }
        }).transform(this.beerio.raw_html);
        return has_class;
    }
    text(): string;
    text(newText: string): void;
    text(newText?: string) {
        if (newText) {
            this.beerio.raw_html = this.beerio.rewriter.on(this.selector, {
                element(element) {
                    element.setInnerContent(newText);
                },
            }).transform(this.beerio.raw_html);
        } else {
            var text_buffer = "";
            this.beerio.rewriter.on(this.selector, {
                text(text) {
                    text_buffer += text.text;
                }
            }).transform(this.beerio.raw_html);
            return text_buffer;
        }
    }
    html(newContent: string) {
        this.beerio.raw_html = this.beerio.rewriter.on(this.selector, {
            element(element) {
                element.setInnerContent(newContent, { html: true });
            }
        }).transform(this.beerio.raw_html);
    }
    append(newContent: string) {
        this.beerio.raw_html = this.beerio.rewriter.on(this.selector, {
            element(element) {
                element.append(newContent, { html: true });
            }
        }).transform(this.beerio.raw_html);
    }
    prepend(newContent: string) {
        this.beerio.raw_html = this.beerio.rewriter.on(this.selector, {
            element(element) {
                element.prepend(newContent, { html: true });
            }
        }).transform(this.beerio.raw_html);
    }
    before(newContent: string) {
        this.beerio.raw_html = this.beerio.rewriter.on(this.selector, {
            element(element) {
                element.before(newContent, { html: true });
            }
        }).transform(this.beerio.raw_html);
    }
    after(newContent: string) {
        this.beerio.raw_html = this.beerio.rewriter.on(this.selector, {
            element(element) {
                element.after(newContent, { html: true });
            }
        }).transform(this.beerio.raw_html);
    }
    replaceWith(newContent: string) {
        this.beerio.raw_html = this.beerio.rewriter.on(this.selector, {
            element(element) {
                element.replace(newContent, { html: true });
            }
        }).transform(this.beerio.raw_html);
    }
    empty() {
        this.beerio.raw_html = this.beerio.rewriter.on(this.selector, {
            element(element) {
                element.setInnerContent("");
            }
        }).transform(this.beerio.raw_html);
    }
    remove() {
        this.beerio.raw_html = this.beerio.rewriter.on(this.selector, {
            element(element) {
                element.remove();
            }
        }).transform(this.beerio.raw_html);
    }
}