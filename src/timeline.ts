import { IIoCModule, IoCKernel, ServiceCollection, ServiceContract } from "@aster-js/ioc";
import { Constructor } from "@aster-js/core";
import { LitElement, html, HTMLTemplateResult, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ITimelineRenderer } from "./abstraction";
import { AsterTooltipService, DefaultTimelineRenderer, DefaultTimelineStepRenderer } from "./defaults";
import styles from "./timeline.css";

@customElement("aster-timeline")
export class Timeline extends LitElement {
    private _module: IIoCModule | null = null;

    static readonly styles = unsafeCSS(styles);

    @property({ type: String })
    layout: "vertical" | "horizontal" = "horizontal";

    @property()
    items: any[] = [];

    @property({ type: Boolean })
    autoInit: boolean = true;

    init(iocModule?: IIoCModule): void {
        const scope = iocModule ? iocModule.createChildScope("grid") : IoCKernel.create();
        this._module = scope.configure(s => this.configure(s)).build();
    }

    protected configure(services: ServiceCollection): void {
        this.dispatchEvent(new CustomEvent("configure-services", { bubbles: true, composed: true, detail: services }));

        this.tryAddDefaultImpl(services, DefaultTimelineStepRenderer);
        this.tryAddDefaultImpl(services, DefaultTimelineRenderer);
        this.tryAddDefaultImpl(services, AsterTooltipService);
    }

    protected tryAddDefaultImpl<T>(services: ServiceCollection, ctor: Constructor<T>): void {
        const serviceId = ServiceContract.resolve(ctor);
        if (serviceId && !services.has(serviceId)) services.addSingleton(ctor);
    }

    protected render(): HTMLTemplateResult {
        return html`<div class="container ${this.layout}">${this.renderSteps()}</div>`;
    }

    protected *renderSteps(): IterableIterator<HTMLTemplateResult | HTMLElement> {
        if (this.items.length) {
            if (!this._module && this.autoInit) {
                this.init();
            }
            if (this._module) {
                const renderer = this._module.services.get(ITimelineRenderer, true);
                yield* renderer.render(this.items);
            }
        }
    }
}
