// import throttle from "properjs-throttle";
import Stagger from "properjs-stagger";
import ScrollController from "properjs-scrollcontroller";
import * as core from "../core";


/**
 *
 * @public
 * @global
 * @class AnimateController
 * @param {Element} element The dom element to work with.
 * @classdesc Handle scroll events for a DOMElement.
 *
 */
class AnimateController {
    constructor ( elements ) {
        // Make a native Array[] out of Hobo()
        this.elements = [].slice.call( elements );
        this.start();
    }


    /**
     *
     * @instance
     * @description Initialize the animation frame
     * @memberof AnimateController
     * @method start
     *
     */
    start () {
        this.scroller = new ScrollController();
        this.scroller.on( "scroll", () => {
            this.handle();
        });

        this.handle();
    }


    handle () {
        this.elements = [].slice.call( core.dom.page.find( core.config.lazyAnimSelector ).not( ".is-animated" ) );

        if ( !this.elements.length ) {
            this.scroller.stop();
            this.scroller = null;

            core.log( "[AnimateController] Done!" );

        } else {
            const visible = core.util.getElementsInView( this.elements );

            if ( visible.length ) {
                this.animate( visible );
            }
        }
    }


    animate ( elems ) {
        // Remove elements from the Array[]
        elems.forEach(( elem ) => {
            this.elements.splice(
                this.elements.indexOf( elem ),
                1
            );
        });

        // Sequence the animation of the elements
        new Stagger({
            steps: elems.length,
            delay: 50

        }).step(( i ) => {
            elems[ i ].className += " is-animated";

        }).done(() => {
            core.log( "[AnimateController] Stagger Complete" );

        }).start();
    }


    /**
     *
     * @instance
     * @description Stop the animation frame
     * @memberof AnimateController
     * @method destroy
     *
     */
    destroy () {
        if ( this.scroller ) {
            this.scroller.destroy();
            this.scroller = null;
        }
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default AnimateController;
