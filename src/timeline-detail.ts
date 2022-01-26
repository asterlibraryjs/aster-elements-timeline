import { LitElement, html, HTMLTemplateResult, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./timeline-detail.css";

@customElement("aster-timeline-detail")
export class TimelineDetail extends LitElement {
    static styles = unsafeCSS(styles);

    protected render(): HTMLTemplateResult {
        return html`<div><slot></slot></div>`;
    }
}
