import * as core from "../core";
import $ from "properjs-hobo";
import paramalama from "paramalama";


/**
 *
 * @public
 * @global
 * @class ViewController
 * @param {Element} element The view element to render into
 * @classdesc Handle shared view functionality.
 *
 */
class ViewController {
    constructor ( element ) {
        this.element = element;
        this.data = this.element.data();
        this.uid = this.data.uid;
        this.endpoint = this.data.url;
        this.json = null;

        this.init();
    }


    /**
     *
     * @instance
     * @description Run the View initialization stack
     * @memberof View
     * @method init
     *
     */
    init () {
        this.load().then( ( json ) => {
            this.json = json;
            this.render();
            this.exec();
            this.done();
        });
    }


    /**
     *
     * @instance
     * @description Fire callback when init stack is done
     * @memberof View
     * @method done
     *
     */
    done () {}


    /**
     *
     * @instance
     * @description Get the data for the view
     * @memberof View
     * @method load
     * @returns {Promise}
     *
     */
    load () {
        return new Promise(( resolve ) => {
            const cache = core.cache.get( `view--${this.uid}` );
            const query = paramalama( window.location.search );

            // Set these for Squarespace API JSON fetching
            query.format = "json";

            if ( cache ) {
                resolve( cache );

            } else {
                $.ajax({
                    url: this.endpoint,
                    dataType: "json",
                    method: "GET",
                    data: query

                }).then(( json ) => {
                    // core.cache.set( `view--${this.uid}`, response );

                    resolve( json );
                });
            }
        });
    }


    /**
     *
     * @instance
     * @description Render the view template
     * @memberof View
     * @method render
     *
     */
    render () {
        // Webpack es6Module { __esModule: true, default: f }
        const view = require( `../views/${this.uid}` );

        this.element[ 0 ].innerHTML = view.default( this.json );
    }


    /**
     *
     * @instance
     * @description Initialize controllers
     * @memberof View
     * @method exec
     *
     */
    exec () {
        core.util.loadImages( this.element.find( core.config.lazyImageSelector ) );
    }


    /**
     *
     * @instance
     * @description Stop the animation frame
     * @memberof View
     * @method destroy
     *
     */
    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default ViewController;
