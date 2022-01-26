import { ServiceContract } from "@aster-js/ioc";
import { html, HTMLTemplateResult } from "lit";
import { ITimelineStepRenderer, ITimelineRenderer } from "../abstraction";
import { DefaultTimelineStep } from "./default-timeline-step";

@ServiceContract(ITimelineRenderer)
export class DefaultTimelineRenderer implements ITimelineRenderer<DefaultTimelineStep> {

    constructor(
        @ITimelineStepRenderer private readonly _stepRenderer: ITimelineStepRenderer<DefaultTimelineStep>
    ) { }

    *render(items: DefaultTimelineStep[]): IterableIterator<HTMLTemplateResult | HTMLElement> {
        yield* items.map(this.renderItem, this).flatMap(x => [...x]);
    }

    protected *renderItem(item: DefaultTimelineStep, index: number, items: DefaultTimelineStep[]): IterableIterator<HTMLTemplateResult> {
        if (index) {
            const leadColumn = (index - 1) * 2 + 2; // Every 2 columns starting at column 2
            const duration = this.resolveLeadTime(items[index - 1], item);
            yield html`<aster-timeline-lead style="grid-column: ${leadColumn}" .duration=${duration}></aster-timeline-lead>`;
        }
        yield html`${this._stepRenderer.renderDetail(item, index, items)}`;
        yield html`${this._stepRenderer.renderStep(item, index, items)}`;
    }

    protected resolveLeadTime(first: any, second: any) {
        return second.date - first.date;
    }
}
