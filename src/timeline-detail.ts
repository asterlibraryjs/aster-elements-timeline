import { LitElement, html, HTMLTemplateResult, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TimelineLayout } from "./abstraction";
import styles from "./timeline-detail.css";

@customElement("aster-timeline-detail")
export class TimelineDetail extends LitElement {
    static styles = unsafeCSS(styles);

    @property({ type: Number })
    layout: TimelineLayout = "horizontal";

    protected render(): HTMLTemplateResult {
        return html`<div class=${this.layout}><slot></slot></div>`;
    }
}
