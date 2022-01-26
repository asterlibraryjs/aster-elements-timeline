import { ServiceContract } from "@aster-js/ioc";
import { html, HTMLTemplateResult } from "lit";
import { ITimelineStepRenderer, ITooltipService } from "../abstraction";
import { DefaultTimelineStep } from "./default-timeline-step";

function resolveTemplateResult(value: unknown, thisArg: any): HTMLTemplateResult {
    if (typeof value === "function") {
        return value.apply(thisArg);
    }
    return html`${value}`;
}

@ServiceContract(ITimelineStepRenderer)
export class DefaultTimelineStepRenderer implements ITimelineStepRenderer<DefaultTimelineStep> {

    constructor(
        @ITooltipService private readonly _toolTipService: ITooltipService
    ) { }

    renderDetail(item: DefaultTimelineStep, index: number, items: DefaultTimelineStep[]): unknown {
        const stepColumn = this.resolveStepColumn(index);
        const detailColumn = this.resolveDetailColumn(index);
        const detailRow = this.resolveDetailRow(index);
        if (item.description) {
            return html`
            <aster-timeline-blockquote style="grid-row: ${detailRow};grid-column: ${stepColumn}"></aster-timeline-blockquote>
            <aster-timeline-detail style="grid-row: ${detailRow};grid-column: ${detailColumn} / span 2">
                ${this.renderDetailContent(item, index, items)}
            </aster-timeline-detail>`;
        }
    }

    protected renderDetailContent(item: DefaultTimelineStep, _index: number, _items: DefaultTimelineStep[]): unknown {
        return resolveTemplateResult(item.description, item);
    }

    renderStep(item: DefaultTimelineStep, index: number, _items: DefaultTimelineStep[]): unknown {
        const stepColumn = this.resolveStepColumn(index);
        return html`<aster-timeline-step
            style="grid-column: ${stepColumn}"
            @mouseenter="${(ev: UIEvent) => this.onDidMouseEnterStep(ev, item)}">
            ${resolveTemplateResult(item.icon, item)}
        </aster-timeline-step>`;
    }

    protected onDidMouseEnterStep(ev: UIEvent, item: DefaultTimelineStep): void {
        this._toolTipService.show(ev, resolveTemplateResult(item.tooltip, item));
    }

    protected resolveStepColumn(index: number): number {
        return index * 2 + 1;
    }

    protected resolveDetailColumn(index: number): number {
        return index * 2 + 2;
    }

    protected resolveDetailRow(index: number): number {
        return index % 2 === 0 ? 1 : 3;
    }
}
