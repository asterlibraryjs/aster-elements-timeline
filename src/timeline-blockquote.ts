import { LitElement, html, css, HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TimelineLayout } from "./abstraction";

@customElement("aster-timeline-blockquote")
export class TimelineBlockquote extends LitElement {
    static styles = css`
    :host {
        display: block;
    }
    .container {
        display: grid;
        width: 100%;
        height: 100%;
        justify-items: center;
        align-items: center;
    }
    .line.horizontal {
        width: 0;
        height: 100%;
        border-left: 1px dotted var(--_aster-timeline__border-color);
    }
    .line.vertical {
        width: 100%;
        height: 0;
        border-top: 1px dotted var(--_aster-timeline__border-color);
    }`;

    @property({ type: Number })
    layout: TimelineLayout = "horizontal";

    protected render(): HTMLTemplateResult {
        return html`<div class="container"><div class="line ${this.layout}"></div></div>`;
    }
}
