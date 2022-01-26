import { ServiceIdentifier } from "@aster-js/ioc";
import { HTMLTemplateResult } from "lit";

export const ITooltipService = ServiceIdentifier<ITooltipService>("ITooltipService");

export interface ITooltipService {
    show(ev: UIEvent, content: unknown): void;
}
