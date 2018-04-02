// import * as core from "../core";
import Analytics from "./Analytics";
import ScrollController from "properjs-scrollcontroller";


/**
 *
 * @public
 * @global
 * @class ScrollController
 * @classdesc Handle setting aspect ratio with JS.
 *
 */
class ScrollController_ {
    constructor () {
        this.analytics = new Analytics();
        this.milestones = [
            { hit: 25, met: false },
            { hit: 50, met: false },
            { hit: 75, met: false },
            { hit: 100, met: false }
        ];

        this.bind();
    }


    bind () {
        this.scroller = new ScrollController();
        this.scroller.on( "scroll", () => {
            const scrollPos = this.scroller.getScrollY();
            const scrollMax = this.scroller.getScrollMax();

            this.milestones.forEach(( milestone ) => {
                const percent = (scrollPos / scrollMax) * 100;

                if ( percent >= milestone.hit && !milestone.met ) {
                    milestone.met = true;
                    this.analytics.doEvent(
                        "site interaction",
                        "scroll tracking",
                        `${milestone.hit}%`,
                        "TRUE"
                    );
                }
            });
        });
    }


    destroy () {
        this.scroller.off( "scroll" );
        this.scroller = null;
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default ScrollController_;
