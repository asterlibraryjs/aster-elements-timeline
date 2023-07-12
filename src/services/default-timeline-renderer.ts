import { ServiceContract } from "@aster-js/ioc";
import { html, HTMLTemplateResult } from "lit";
import { ITimelineStepRenderer, ITimelineRenderer, TimelineRenderingOptions } from "../abstraction";

@ServiceContract(ITimelineRenderer)
export class DefaultTimelineRenderer<T> implements ITimelineRenderer<T> {

    constructor(
        @ITimelineStepRenderer private readonly _stepRenderer: ITimelineStepRenderer<T>
    ) { }

    *render(items: T[], opts: TimelineRenderingOptions): IterableIterator<HTMLTemplateResult | HTMLElement> {
        yield* items.map((x, i)=> this.renderItem(x, i, items, opts), this).flatMap(x => [...x]);
    }

    protected *renderItem(item: T, index: number, items: T[], opts: TimelineRenderingOptions): IterableIterator<HTMLTemplateResult> {
        if (index) {
            yield html`${this._stepRenderer.renderLead(item, index, items, opts)}`;
        }
        yield html`${this._stepRenderer.renderDetail(item, index, items, opts)}`;
        yield html`${this._stepRenderer.renderStep(item, index, items, opts)}`;
    }
}
