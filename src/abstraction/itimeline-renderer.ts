import { ServiceIdentifier } from "@aster-js/ioc";
import { HTMLTemplateResult } from "lit";

export const ITimelineRenderer = ServiceIdentifier<ITimelineRenderer>("ITimelineRenderer");

/**
 * Abstract the overall rendering so it can be done by any rendering framework
 */
export interface ITimelineRenderer<T = any> {
    render(items: T[]): IterableIterator<HTMLTemplateResult | HTMLElement>;
}
