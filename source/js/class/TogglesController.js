import $ from "properjs-hobo";
import * as core from "../core";


/**
 *
 * @public
 * @global
 * @class Toggles
 * @param {Element} element The dom element to work with.
 * @classdesc Handle Toggle elements zones...
 *
 */
class Toggles {
    constructor ( element ) {
        this.element = element;
        this.toggles = this.element.find( ".js-toggles-item" );

        if ( !core.detect.isDevice() ) {
            this.bind();
        }
    }


    bind () {
        this.toggles.eq( 0 ).addClass( "is-active" );
        this.element.on( "mouseenter", ".js-toggles-item", ( e ) => {
            const targ = $( e.target );
            const elem = targ.is( ".js-toggles-item" ) ? targ : targ.closest( ".js-toggles-item" );

            this.toggles.removeClass( "is-active" );
            elem.addClass( "is-active" );
        });
    }


    destroy () {
        this.element.off();
    }
}



/**
 *
 * @public
 * @class TogglesController
 * @param {Hobo} elements The Toggles modules
 * @classdesc Handles Toggles
 *
 */
class TogglesController {
    constructor ( elements ) {
        this.elements = elements;
        this.instances = [];

        this.init();
    }


    init () {
        this.elements.forEach(( element, i ) => {
            this.instances.push( new Toggles( this.elements.eq( i ) ) );
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
export default TogglesController;
