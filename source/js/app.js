// Load the SASS
require( "../sass/screen.scss" );


// Load the JS
import router from "./router";
import * as core from "./core";
import navi from "./navi";
import intro from "./intro";
import Analytics from "./class/Analytics";
import ScrollController from "properjs-scrollcontroller";


/**
 *
 * @public
 * @class App
 * @classdesc Load the App application Class to handle it ALL.
 *
 */
class App {
    constructor () {
        this.core = core;
        this.navi = navi;
        this.intro = intro;
        this.router = router;
        this.scroller = new ScrollController();

        this.bind();
        this.init();
    }


    bind () {
        this.core.emitter.on( "app--intro-teardown", () => {
            this.core.log( "App Intro Teardown" );
        });

        this.core.emitter.on( "app--page-teardown", () => {
            this.core.log( "App Page Teardown" );
        });

        this.scroller.on( "scrolldown", () => {
            const scrollPos = this.scroller.getScrollY();

            if ( scrollPos >= (window.innerHeight / 2) ) {
                this.core.dom.html.removeClass( "is-scroll-up" ).addClass( "is-scroll-down" );
            }
        });

        this.scroller.on( "scrollup", () => {
            const scrollPos = this.scroller.getScrollY();

            if ( scrollPos >= (window.innerHeight / 2) ) {
                this.core.dom.html.removeClass( "is-scroll-down" ).addClass( "is-scroll-up" );
            }
        });
    }


    /**
     *
     * @public
     * @instance
     * @method init
     * @memberof App
     * @description Initialize application modules.
     *
     */
    init () {
        // Core
        this.core.detect.init();

        // Utility ?

        // Views
        this.navi.init();
        this.intro.init();

        // Controller
        this.router.init();

        // Analytics
        this.analytics = new Analytics();
    }
}


// Create {app} instance
window.app = new App();


// Export {app} instance
export default window.app;
