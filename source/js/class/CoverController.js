import * as core from "../core";
import ScrollController from "properjs-scrollcontroller";


/**
 *
 * @public
 * @global
 * @class CoverController
 * @param {Element} element The dom element to work with.
 * @classdesc Handle fullbleed cover image moments.
 *
 */
class CoverController {
    constructor ( elements ) {
        this.elements = elements;
        this.isCoverActive = false;
        this.isScrollActive = false;
        this.activeCoverData = null;

        this.start();
    }


    /**
     *
     * @instance
     * @description Initialize the animation frame
     * @memberof CoverController
     * @method start
     *
     */
    start () {
        this.scroller = new ScrollController();
        this.scroller.on( "scroll", () => {
            this.scrollHandler();
        });

        this.scrollHandler();
    }


    scrollHandler () {
        const scrollY = this.scroller.getScrollY();
        let isCover = false;
        let isScroll = false;
        let data = null;

        this.elements.forEach(( el, i ) => {
            const bounds = el.getBoundingClientRect();
            const cover = this.elements.eq( i );
            const scroll = cover.is( ".js-cover-scroll" );
            const overScroll = (scrollY < 0 && Math.abs( scrollY ) === Math.abs( bounds.top ));

            if ( (overScroll || (bounds.top <= 0 && bounds.bottom > 0)) && !scroll ) {
                isCover = true;
                data = cover.data();
            }

            if ( scroll ) {
                isScroll = (bounds.bottom >= window.innerHeight);
            }
        });

        if ( isCover && !this.isCoverActive ) {
            this.isCoverActive = true;
            core.dom.html.addClass( "is-cover-view" );

            if ( data.cover ) {
                this.activeCoverData = data.cover;
                core.dom.html.addClass( `is-cover-view--${this.activeCoverData}` );
            }

        } else if ( !isCover && this.isCoverActive ) {
            this.isCoverActive = false;
            core.dom.html.removeClass( "is-cover-view" );

            if ( this.activeCoverData ) {
                core.dom.html.removeClass( `is-cover-view--${this.activeCoverData}` );
                this.activeCoverData = null;
            }
        }

        if ( isScroll && !this.isScrollActive ) {
            this.isScrollActive = true;
            core.dom.html.addClass( "is-page-scroll" );

        } else if ( !isScroll && this.isScrollActive ) {
            this.isScrollActive = false;
            core.dom.html.removeClass( "is-page-scroll" );
        }
    }


    /**
     *
     * @instance
     * @description Stop the animation frame
     * @memberof CoverController
     * @method destroy
     *
     */
    destroy () {
        core.dom.html.removeClass( "is-cover-view is-page-scroll" );

        if ( this.activeCoverData ) {
            core.dom.html.removeClass( `is-cover-view--${this.activeCoverData}` );
        }

        this.scroller.destroy();
        this.scroller = null;
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default CoverController;
