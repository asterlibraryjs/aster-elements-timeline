import { ServiceContract } from "@aster-js/ioc";
import { Tooltip, TooltipAlign, TooltipPosition } from "@aster-elements/tooltip";
import { ITooltipService, TimelineRenderingOptions } from "../abstraction";

@ServiceContract(ITooltipService)
export class AsterTooltipService<T> implements ITooltipService<T> {

    constructor(
        private readonly _tooltipName?: string
    ) { }

    show(ev: UIEvent, content: unknown, item: T, index: number, items: T[], opts: TimelineRenderingOptions): void {

        const position = this.resolveTooltipPosition(index, opts);
        const align = this.resolveTooltipAlign(index, items, opts);

        this.getTooltip().show(ev, content, { autoHide: true, align, position });
    }

    protected getTooltip(): Tooltip {
        return Tooltip.get(this._tooltipName)
    }

    private resolveTooltipAlign(index: number, items: T[], opts: TimelineRenderingOptions): TooltipAlign {
        if (index === (items.length - 1)) {
            return "end";
        }
        return opts.layout === "horizontal" ? "center" : "start";
    }

    private resolveTooltipPosition(index: number, opts: TimelineRenderingOptions): TooltipPosition {
        if ((index % 2) == 0) {
            return opts.layout === "horizontal" ? "bottom" : "right";
        }
        return opts.layout === "horizontal" ? "top" : "left";
    }
}
