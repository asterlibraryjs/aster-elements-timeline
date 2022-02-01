import { LitElement, html, HTMLTemplateResult, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import * as moment from "moment";
import styles from "./timeline-lead.css";

@customElement("aster-timeline-lead")
export class TimelineLead extends LitElement {
    static styles = unsafeCSS(styles);

    /** Lead time in milliseconds */
    @property({ type: Number })
    duration: number = 0;

    protected render(): HTMLTemplateResult {
        const timespan = this.duration > 0 ? moment.duration(this.duration).humanize() : html`&nbsp;`;
        return html`<div class="container">
            <div class="line"></div>
            <div class="indicator"></div>
            <div class="duration">${timespan}</div>
        </div>`;
    }
}
