import { LitElement, html, unsafeCSS, HTMLTemplateResult, TemplateResult } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { customElement, property } from "lit/decorators.js";
import styles from "./timeline-step-icon.css";

@customElement("aster-timeline-step-icon")
export class TimelineStepIcon extends LitElement {

    static readonly styles = unsafeCSS(styles);

    @property({ type: String })
    svg!: string;

    @property({ type: String })
    type: "none" | "progress" | "info" | "ask" | "ok" | "warn" | "error" = "none";

    @property({ type: String })
    shape: "rounded" | "circle" = "circle";

    protected render(): HTMLTemplateResult {
        return html`<div class="${this.type} ${this.shape}">${
            unsafeSVG(`<svg><use xlink:href="${this.svg}" /></svg>`)
        }</div>`
    }
}
