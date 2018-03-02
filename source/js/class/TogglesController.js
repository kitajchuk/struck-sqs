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
        this.toggles = this.element.find( ".js-toggles-toggler" );
        this.targets = this.element.find( ".js-toggles-target" );

        if ( !core.detect.isDevice() ) {
            this.bind();
        }
    }


    bind () {
        this.toggles.eq( 0 ).addClass( "is-active" );
        this.targets.eq( 0 ).addClass( "is-active" );
        this.element.on( "mouseenter", ".js-toggles-toggler", ( e ) => {
            const eventTarget = $( e.target );
            const elemToggle = eventTarget.is( ".js-toggles-toggler" ) ? eventTarget : eventTarget.closest( ".js-toggles-toggler" );
            const elemData = elemToggle.data();
            const elemTarget = this.element.find( elemData.target );

            this.toggles.removeClass( "is-active" );
            elemToggle.addClass( "is-active" );

            this.targets.removeClass( "is-active" );
            elemTarget.addClass( "is-active" );
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
