import { ServiceContract } from "@aster-js/ioc";
import { html, HTMLTemplateResult } from "lit";
import { ITimelineStepRenderer, ITimelineRenderer } from "../abstraction";

@ServiceContract(ITimelineRenderer)
export class DefaultTimelineRenderer<T> implements ITimelineRenderer<T> {

    constructor(
        @ITimelineStepRenderer private readonly _stepRenderer: ITimelineStepRenderer<T>
    ) { }

    *render(items: T[]): IterableIterator<HTMLTemplateResult | HTMLElement> {
        yield* items.map(this.renderItem, this).flatMap(x => [...x]);
    }

    protected *renderItem(item: T, index: number, items: T[]): IterableIterator<HTMLTemplateResult> {
        if (index) {
            yield html`${this._stepRenderer.renderLead(item, index, items)}`;
        }
        yield html`${this._stepRenderer.renderDetail(item, index, items)}`;
        yield html`${this._stepRenderer.renderStep(item, index, items)}`;
    }
}
