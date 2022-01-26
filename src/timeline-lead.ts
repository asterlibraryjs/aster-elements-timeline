import { LitElement, html, css, HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import * as moment from "moment";

@customElement("aster-timeline-lead")
export class TimelineLead extends LitElement {
    static styles = css`
    :host {
        display: block;
        font-size: var(--_aster-timeline__lead-time-font-size);
    }
    .container {
        display: grid;
        justify-items: center;
        align-items: center;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-areas: "duration" "lead"
    }
    .line {
        grid-area: lead;
        height: 3px;
        width: 100%;
        background-color: var(--_aster-timeline__border-color);
    }
    .indicator {
        grid-area: lead;
        height: 6px;
        width: 6px;
        border-radius: 50%;
        background-color: var(--_aster-timeline__border-color);
    }`;

    /** Lead time in milliseconds */
    duration: number = 0;

    protected render(): HTMLTemplateResult {
        const timespan = moment.duration(this.duration);
        return html`<div class="container">
            <div class="line"></div>
            <div class="indicator"></div>
            <div class="duration">${timespan.humanize()}</div>
        </div>`;
    }
}
