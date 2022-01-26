import { ServiceIdentifier } from "@aster-js/ioc";
import { TemplateResult } from "lit";

export const ITimelineStepRenderer = ServiceIdentifier<ITimelineStepRenderer>("ITimelineStepRenderer");

export interface ITimelineStepRenderer<T = any> {
    renderDetail(item: T, index: number, items: T[]): unknown;
    renderStep(item: T, index: number, items: T[]): unknown;
}
