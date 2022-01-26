import { css, html, HTMLTemplateResult, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("aster-demo-custom-detail")
export class CustomDetail extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
        h1 {
            margin: 0;
            font-size: 1.1em;
        }`;

    @property({ type: Number })
    step: number = -1;

    @property({ type: String })
    question: string = "";

    @property({ type: String })
    answer: string = "";

    render(): HTMLTemplateResult {
        return html`
        <h1>Question ${this.step}</h1>
        <div><b>Q:</b> ${this.question}</div>
        <div><b>A:</b> <i>${this.answer}</i></div>`;
    }
}
