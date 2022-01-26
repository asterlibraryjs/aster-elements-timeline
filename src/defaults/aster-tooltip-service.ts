import { ServiceContract } from "@aster-js/ioc";
import { Tooltip } from "@aster-elements/tooltip";
import { ITooltipService } from "../abstraction";

@ServiceContract(ITooltipService)
export class AsterTooltipService implements ITooltipService {

    constructor(
        private readonly _tooltipName?: string
    ) { }

    show(ev: UIEvent, content: unknown): void {
        const tooltip = Tooltip.get(this._tooltipName);
        tooltip.show(ev, content, { autoHide: true, align: "center", position: "bottom" });
    }
}
