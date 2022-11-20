import { ServiceIdentifier } from "@aster-js/ioc";
import { HTMLTemplateResult } from "lit";

export const ITimelineRenderer = ServiceIdentifier<ITimelineRenderer>("ITimelineRenderer");

export type TimelineLayout = "vertical" | "horizontal";

export type TimelineRenderingOptions = {
    readonly layout: TimelineLayout;
};

/**
 * Abstract the overall rendering so it can be done by any rendering framework
 */
export interface ITimelineRenderer<T = any> {
    render(items: T[], opts: TimelineRenderingOptions): IterableIterator<HTMLTemplateResult | HTMLElement>;
}
