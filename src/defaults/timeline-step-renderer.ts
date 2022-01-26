import { html } from "lit";
import { ITimelineStepRenderer, ITooltipService } from "../abstraction";

export abstract class TimelineStepRenderer<T> implements ITimelineStepRenderer<T> {

    constructor(
        private readonly _toolTipService: ITooltipService
    ) { }

    renderLead(item: T, index: number, items: T[]): unknown {
        const leadColumn = (index - 1) * 2 + 2; // Every 2 columns starting at column 2
        const duration = this.resolveLeadTime(items[index - 1], item);
        return html`<aster-timeline-lead style="grid-column: ${leadColumn}" .duration=${duration}></aster-timeline-lead>`;
    }

    protected abstract resolveLeadTime(first: T, second: T): number;

    renderDetail(item: T, index: number, items: T[]): unknown {
        const stepColumn = this.resolveStepColumn(index);
        const detailColumn = this.resolveDetailColumn(index);
        const detailRow = this.resolveDetailRow(index);

        const detail = this.renderDetailContent(item, index, items);
        if (detail) {
            return html`
            <aster-timeline-blockquote style="${detailRow};${stepColumn}"></aster-timeline-blockquote>
            <aster-timeline-detail style="${detailRow};${detailColumn}">
                ${detail}
            </aster-timeline-detail>`;
        }
    }

    protected abstract renderDetailContent(item: T, index: number, items: T[]): unknown;

    renderStep(item: T, index: number, items: T[]): unknown {
        const stepColumn = this.resolveStepColumn(index);
        return html`<aster-timeline-step
            style="${stepColumn}"
            @mouseenter="${(ev: UIEvent) => this.onDidMouseEnterStep(ev, item, index, items)}">
            ${this.renderStepContent(item, index, items)}
        </aster-timeline-step>`;
    }

    protected abstract renderStepContent(item: T, index: number, items: T[]): unknown;

    protected onDidMouseEnterStep(ev: UIEvent, item: T, index: number, items: T[]): void {
        const content = this.renderTooltipContent(item, index, items);
        if (content) {
            this._toolTipService.show(ev, content);
        }
    }

    protected abstract renderTooltipContent(item: T, index: number, items: T[]): unknown;

    protected resolveStepColumn(index: number): string {
        return `grid-column:${index * 2 + 1}`;
    }

    protected resolveDetailColumn(index: number): string {
        return `grid-column:${index * 2 + 2}/span 2`;
    }

    protected resolveDetailRow(index: number): string {
        return `grid-row:${index % 2 === 0 ? 1 : 3}`;
    }
}
