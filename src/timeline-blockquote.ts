import { LitElement, html, css, HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import * as moment from "moment";

@customElement("aster-timeline-blockquote")
export class TimelineBlockquote extends LitElement {
    static styles = css`
    :host {
        display: block;
    }
    .line {
        width: 0;
        height: 100%;
        margin: 0 auto;
        border-left: 1px dotted var(--_aster-timeline__border-color);
    }`;

    protected render(): HTMLTemplateResult {
        return html`<div class="line"></div>`;
    }
}
