import { css, html, HTMLTemplateResult, LitElement, svg, SVGTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("aster-demo-custom-step")
export class CustomStep extends LitElement {
    static styles = css`
        :host {
            display: block;
        }`;

    @property({ type: String })
    type: "ok" | "warn" = "warn";

    render(): HTMLTemplateResult {
        return html`<aster-timeline-step-icon .type="${this.type}" .svg="${this.resolveIcon()}"></aster-timeline-step-icon>`
    }

    resolveIcon(): string {
        if (this.type === "warn") {
            return "../.bin/codicon.svg#warning";
        }
        return "../.bin/codicon.svg#check";
    }
}
