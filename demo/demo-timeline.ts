import "../src";
import { css, html, HTMLTemplateResult, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import data from "./data";

@customElement("aster-demo-timeline")
export class CustomDetail extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
        aster-timeline {
            --aster-timeline__border-color: #7c0c57;
            color: #7c0c57;
        }`;

    @property()
    items!: any[];

    constructor() {
        super();
        this.items = data.map(x => {
            return { ...x, icon: this.getIcon, detail: this.getDetail, tooltip: this.getTooltip }
        });
    }

    render(): HTMLTemplateResult {
        return html`<aster-timeline .items="${this.items}"></aster-timeline>`;
    }

    getIcon(item: any, idx: number) {
        return html`<aster-demo-custom-step .type="${item.succeed ? "succeed" : "failed"}"></aster-demo-custom-step>`;
    }

    getTooltip() {
        return html`That what <b>she</b> said`;
    }

    getDetail(item: any, idx: number) {
        if (item.question) {
            return html`<aster-demo-custom-detail
                .step="${idx + 1}"
                .question="${item.question}"
                .answer="${item.answer}">
            </aster-demo-custom-detail>`;
        }
    }
}
