import { ServiceContract } from "@aster-js/ioc";
import { html, HTMLTemplateResult } from "lit";
import { ITimelineStepRenderer, ITooltipService } from "../abstraction";
import { DefaultTimelineStep } from "./default-timeline-step";
import { TimelineStepRenderer } from "./timeline-step-renderer";

@ServiceContract(ITimelineStepRenderer)
export class DefaultTimelineStepRenderer extends TimelineStepRenderer<DefaultTimelineStep> {
    constructor(
        @ITooltipService toolTipService: ITooltipService
    ) { super(toolTipService) }

    protected resolveLeadTime(first: DefaultTimelineStep, second: DefaultTimelineStep) {
        return second.date.getTime() - first.date.getTime();
    }

    protected renderDetailContent(item: DefaultTimelineStep, index: number, items: DefaultTimelineStep[]): unknown {
        return this.resolveTemplateResult(item.detail, item, index, items);
    }

    protected renderStepContent(item: DefaultTimelineStep, index: number, items: DefaultTimelineStep[]): unknown {
        return this.resolveTemplateResult(item.icon, item, index, items);
    }

    protected renderTooltipContent(item: DefaultTimelineStep, index: number, items: DefaultTimelineStep[]): unknown {
        return this.resolveTemplateResult(item.tooltip, item, index, items);
    }

    private resolveTemplateResult(value: unknown, item: DefaultTimelineStep, index: number, items: DefaultTimelineStep[]): HTMLTemplateResult {
        if (typeof value === "function") {
            return value(item, index, items);
        }
        return html`${value}`;
    }
}
