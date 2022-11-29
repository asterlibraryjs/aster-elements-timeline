import "../src";
import { css, html, HTMLTemplateResult, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import data from "./data";

@customElement("aster-demo-timeline")
export class CustomDetail extends LitElement {
    static styles = css`
        :host {
            display: block;
            box-sizing: border-box;
            padding: 5px;
        }
        h1 {
            box-sizing: border-box;
            border-bottom: 1px dashed  #F8F8F2;
            color: #F8F8F2;
        }
        aster-timeline {
            --aster-timeline__border-color: #F8F8F2;
            --aster-timeline__step-icon-size: 35px;
            max-width: 100%;
            color: #F8F8F2;
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
        return html`
            <h1>Horizontal</h1>
            <aster-timeline .items="${this.items}"></aster-timeline>
            <h1>Vertical</h1>
            <aster-timeline style="width: 900px; margin: 0 50px" .items="${this.items}" layout="vertical"></aster-timeline>`;
    }

    getIcon(item: any, idx: number) {
        return html`<aster-demo-custom-step .type="${item.succeed ? "ok" : "warn"}"></aster-demo-custom-step>`;
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
