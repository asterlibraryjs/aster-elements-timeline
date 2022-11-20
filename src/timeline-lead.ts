import { LitElement, html, HTMLTemplateResult, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ClassInfo, classMap } from "lit/directives/class-map.js";
import * as moment from "moment";
import { TimelineLayout } from "./abstraction";
import styles from "./timeline-lead.css";

@customElement("aster-timeline-lead")
export class TimelineLead extends LitElement {
    static styles = unsafeCSS(styles);

    /** Lead time in milliseconds */
    @property({ type: Number })
    duration: number = 0;

    @property({ type: String })
    layout: TimelineLayout = "horizontal";

    @property({ type: Boolean })
    alternate: boolean = false;

    protected render(): HTMLTemplateResult {
        const timespan = this.duration > 0 ? moment.duration(this.duration).humanize() : html`&nbsp;`;
        const classes = {
            container: true,
            [this.layout]: true,
            alternate: this.alternate
        }
        return html`<div class="${classMap(classes)}">
            <div class="line"></div>
            <div class="indicator"></div>
            <div class="duration">${timespan}</div>
        </div>`;
    }
}
