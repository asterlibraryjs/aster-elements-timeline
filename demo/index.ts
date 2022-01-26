import "../src";
import { css, html, HTMLTemplateResult, LitElement } from "lit";
import { Timeline } from "../src";
import { customElement } from "lit/decorators.js";

@customElement("aster-demo-custom-step")
class CustomStep extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
        .container{
            display: grid;
            grid-template-columns: auto auto;
            grid-template-rows: auto;
            gap: -2px;
        }
        .circle {
            border-radius: 50%;
            border: 1px solid green;
        }`;

    render(): HTMLTemplateResult {
        const size = Math.ceil(Math.random() * 25 + 10);
        const style = `width: ${size}px; height: ${size}px; background-color: ${this.getColor()}; border-radius: 50%;`;
        return html`<div class="container">
            <div class="circle" style="${style}"></div>
            <div class="circle" style="${style}"></div>
        </div>`
    }

    private getColor(): string {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    }
}

const timeline = document.getElementById("demo") as Timeline;

timeline.items = [
    { date: new Date(2022, 1, 10, 11, 59, 25), icon: renderIcon, description: () => html`<h3>Step 1</h3><div>Parce que PE c'est le plus Beau</div>` },
    { date: new Date(2022, 1, 10, 12, 22, 5), icon: renderIcon, description: "Step 2: Parce que PE c'etait le plus Beau" },
    { date: new Date(2022, 1, 10, 12, 42, 0), icon: renderIcon, description: "Step 3: Parce que PE s'en vient pas très Beau" },
    { date: new Date(2022, 1, 10, 15, 35, 59), icon: renderIcon, description: "Step 4: Parce que PE c'est le plus Laid" },
    { date: new Date(2022, 1, 10, 15, 35, 59), icon: renderIcon, title: "The end" }
];

function renderIcon() {
    return html`<aster-demo-custom-step></aster-demo-custom-step>`
}

// timeline.addEventListener("configure-services", ev => {
//     const services = (ev as CustomEvent<ServiceCollection>).detail;
//     services.addSingleton(CustomRenderer);
// });
timeline.load();
