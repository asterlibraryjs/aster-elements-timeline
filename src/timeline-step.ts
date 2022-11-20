import { LitElement, html, unsafeCSS, HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TimelineLayout } from "./abstraction";
import styles from "./timeline-step.css";

@customElement("aster-timeline-step")
export class TimelineStep extends LitElement {

    static readonly styles = unsafeCSS(styles);

    @property({ type: Number })
    layout: TimelineLayout = "horizontal";

    protected render(): HTMLTemplateResult {
        return html`<div id="container ${this.layout}"><slot></slot></div>`;
    }
}
