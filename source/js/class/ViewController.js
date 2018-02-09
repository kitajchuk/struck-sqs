import * as core from "../core";
import $ from "properjs-hobo";
import paramalama from "paramalama";
import AspectController from "./AspectController";
import AnimateController from "./AnimateController";


/**
 *
 * @public
 * @global
 * @class View
 * @param {Element} element The view element to render into
 * @classdesc Handle shared view functionality.
 *
 */
class View {
    constructor ( element ) {
        this.element = element;
        this.data = this.element.data();
        this.uid = this.data.uid;
        this.endpoints = this.data.url.split( "," );
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
            const jsons = [];
            const runner = () => {
                if ( !this.endpoints.length ) {
                    resolve( jsons );

                } else {
                    $.ajax({
                        url: this.endpoints.pop(),
                        dataType: "json",
                        method: "GET",
                        data: query

                    }).then(( json ) => {
                        // core.cache.set( `view--${this.uid}`, response );

                        jsons.push( json );

                        runner();
                    });
                }
            };

            // Set these for Squarespace API JSON fetching
            query.format = "json";

            if ( cache ) {
                resolve( cache );

            } else {
                runner();
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

        this.element[ 0 ].innerHTML = view.default( this.json, this.data );
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
        this.imageLoader = core.util.loadImages(
            this.element.find( core.config.lazyImageSelector ),
            core.util.noop
        );
        this.aspectController = new AspectController( this.element.find( core.config.aspectSelector ) );
        this.animController = new AnimateController( this.element.find( core.config.lazyAnimSelector ) );
    }


    /**
     *
     * @instance
     * @description Stop the animation frame
     * @memberof View
     * @method destroy
     *
     */
    destroy () {
        if ( this.aspectController ) {
            this.aspectController.destroy();
        }

        if ( this.animController ) {
            this.animController.destroy();
        }
    }
}



/**
 *
 * @public
 * @class ViewController
 * @param {Hobo} elements The ajax/js-template view modules
 * @classdesc Handles views
 *
 */
class ViewController {
    constructor ( elements ) {
        this.elements = elements;
        this.instances = [];

        this.init();
    }


    init () {
        this.elements.forEach(( element, i ) => {
            this.instances.push( new View( this.elements.eq( i ) ) );
        });
    }


    destroy () {
        this.instances.forEach(( instance ) => {
            instance.destroy();
        });
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default ViewController;
