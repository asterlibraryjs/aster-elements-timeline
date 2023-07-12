import { html } from "lit";
import { StyleInfo, styleMap} from "lit/directives/style-map.js"
import { ITimelineStepRenderer, ITooltipService, TimelineLayout, TimelineRenderingOptions } from "../abstraction";

export abstract class TimelineStepRenderer<T> implements ITimelineStepRenderer<T> {

    constructor(
        private readonly _toolTipService: ITooltipService
    ) { }

    renderLead(item: T, index: number, items: T[], opts: TimelineRenderingOptions): unknown {
        const leadStyle =this.resolveLeadLayout(index, opts.layout);
        const duration = this.resolveLeadTime(items[index - 1], item, opts);
        return html`<aster-timeline-lead style=${leadStyle} .layout=${opts.layout} .duration=${duration} .alternate=${index%2 !== 0}></aster-timeline-lead>`;
    }

    protected abstract resolveLeadTime(first: T, second: T, opts: TimelineRenderingOptions): number;

    renderDetail(item: T, index: number, items: T[], opts: TimelineRenderingOptions): unknown {
        const detailStyle = this.resolveDetailLayout(index, opts.layout);

        const detail = this.renderDetailContent(item, index, items, opts);
        if (detail) {
            return html`
            <div style=${styleMap(detailStyle)} class="aster-timeline-detail-container">
                <aster-timeline-blockquote .layout=${opts.layout}></aster-timeline-blockquote>
                <aster-timeline-detail .layout=${opts.layout}>
                    ${detail}
                </aster-timeline-detail>
            </div>`;
        }
    }

    protected abstract renderDetailContent(item: T, index: number, items: T[], opts: TimelineRenderingOptions): unknown;

    renderStep(item: T, index: number, items: T[], opts: TimelineRenderingOptions): unknown {
        const stepColumn = this.resolveStepLayout(index, opts.layout);
        return html`<aster-timeline-step
            style=${stepColumn}
            .layout=${opts.layout}
            @mouseenter="${(ev: UIEvent) => this.onDidMouseEnterStep(ev, item, index, items, opts)}">
            ${this.renderStepContent(item, index, items, opts)}
        </aster-timeline-step>`;
    }

    protected abstract renderStepContent(item: T, index: number, items: T[], opts: TimelineRenderingOptions): unknown;

    protected onDidMouseEnterStep(ev: UIEvent, item: T, index: number, items: T[], opts: TimelineRenderingOptions): void {
        const content = this.renderTooltipContent(item, index, items, opts);
        if (content) {
            this._toolTipService.show(ev, content);
        }
    }

    protected abstract renderTooltipContent(item: T, index: number, items: T[], opts: TimelineRenderingOptions): unknown;

    protected resolveLeadLayout(index: number, layout: TimelineLayout): string {
        const leadColumn = (index - 1) * 2 + 2;
        if (layout == "horizontal") {
            return `grid-column: ${leadColumn}`;
        }
        return `grid-row: ${leadColumn}`;
    }

    protected resolveDetailLayout(index: number, layout: TimelineLayout): StyleInfo {
        if (layout == "horizontal") {
            return {
                "grid-column": `${index * 2 + 1}/span 3`,
                "grid-row": `${index % 2 === 0 ? 1 : 3}`
            };
        }
        return {
            "grid-row": `${index * 2 + 1}/span 3`,
            "grid-column": `${index % 2 === 0 ? 1 : 3}`
        };
    }

    protected resolveStepLayout(index: number, layout: TimelineLayout): string {
        if (layout == "horizontal") {
            return `grid-column:${index * 2 + 1}`;
        }
        return `grid-row:${index * 2 + 1}`;
    }
}
