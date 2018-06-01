// import $ from "properjs-hobo";
// import * as core from "../core";


/**
 *
 * @public
 * @global
 * @class Hitme
 * @param {Element} element The dom element to work with.
 * @classdesc Handle Toggle elements zones...
 *
 */
class Hitme {
    constructor ( element ) {
        this.element = element;
        this.button = this.element.find( ".js-hitme-button" );
        this.items = this.element.find( ".js-hitme-item" );
        this.empty = this.element.find( ".empty" );

        if ( this.empty.length >= (this.items.length / 2) ) {
            this.element.addClass( "is-hit" );

        } else {
            this.bind();
        }
    }


    bind () {
        this.button.on( "click", () => {
            this.element.addClass( "is-hit" );
            this.anims.addClass( "is-animated" );
        });
    }


    destroy () {
        this.button.off();
    }
}



/**
 *
 * @public
 * @class HitmeController
 * @param {Hobo} elements The Hitme modules
 * @classdesc Handles Hitme
 *
 */
class HitmeController {
    constructor ( elements ) {
        this.elements = elements;
        this.instances = [];

        this.init();
    }


    init () {
        this.elements.forEach(( element, i ) => {
            this.instances.push( new Hitme( this.elements.eq( i ) ) );
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
export default HitmeController;
