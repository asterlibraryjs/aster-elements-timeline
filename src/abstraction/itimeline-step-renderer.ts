import { ServiceIdentifier } from "@aster-js/ioc";
import { TimelineRenderingOptions } from "./itimeline-renderer";

export const ITimelineStepRenderer = ServiceIdentifier<ITimelineStepRenderer>("ITimelineStepRenderer");

export interface ITimelineStepRenderer<T = any> {
    renderLead(item: T, index: number, items: T[], opts: TimelineRenderingOptions): unknown;
    renderDetail(item: T, index: number, items: T[], opts: TimelineRenderingOptions): unknown;
    renderStep(item: T, index: number, items: T[], opts: TimelineRenderingOptions): unknown;
}
