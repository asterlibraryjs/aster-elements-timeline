import { LitElement, html, unsafeCSS, HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./timeline-step.css";

@customElement("aster-timeline-step")
export class TimelineStep extends LitElement {

    static readonly styles = unsafeCSS(styles);

    protected render(): HTMLTemplateResult {
        return html`<div id="container"><slot></slot></div>`;
    }
}
