import { css, html, HTMLTemplateResult, LitElement, svg } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("aster-demo-custom-step")
export class CustomStep extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
        .circle {
            border-radius: 50%;
            width:25px;
            height:25px;
        }
        .circle.succeed {
            border: 4px solid rgb(137 213 137);
            background-color: #2a852a;
        }
        .circle.failed {
            border: 4px solid rgb(229 169 65);
            background-color: rgb(157 73 28);
        }
        .circle > svg {
            color: #fff;
            width: 18px;
            height: 18px;
            padding: 3px;
        }`;

    @property({ type: String })
    type: "succeed" | "failed" = "failed";

    render(): HTMLTemplateResult {
        return html`<div class="circle ${this.type}">${this.renderIcon()}</div>`
    }

    renderIcon() {
        if (this.type === "failed") {
            return svg`<svg><use xlink:href="../.bin/codicon.svg#warning" /></svg>`;
        }
        return svg`<svg><use xlink:href="../.bin/codicon.svg#check" /></svg>`;
    }
}
