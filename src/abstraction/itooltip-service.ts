import { ServiceIdentifier } from "@aster-js/ioc";
import { HTMLTemplateResult } from "lit";
import { TimelineRenderingOptions } from "./itimeline-renderer";

export const ITooltipService = ServiceIdentifier<ITooltipService>("ITooltipService");

export interface ITooltipService<T = unknown> {
    show(ev: UIEvent, content: unknown, item: T, index: number, items: T[], opts: TimelineRenderingOptions): void;
}
