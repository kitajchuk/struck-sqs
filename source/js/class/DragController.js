// import * as core from "../core";
import ResizeController from "properjs-resizecontroller";


/**
 *
 * @public
 * @global
 * @class Drag
 * @param {Element} element The dom element to work with.
 * @classdesc Handle draggable zones...
 *
 */
class Drag {
    constructor ( element ) {
        this.element = element;
        this.dragger = this.element.find( ".js-drag-node" );
        this.options = {
            bounds: this.element[ 0 ],
            cursor: "grab",
            dragClickables: true,
            dragResistance: 0.25,
            edgeResistance: 0.6,
            lockAxis: true,
            throwProps: true,
            type: "x",
            onDragStart: this.onDragStart.bind( this ),
            onDragEnd: this.onDragEnd.bind( this ),
            zIndexBoost: false
        };

        this.bind();
        this.load();
    }


    bind () {
        this.resizer = new ResizeController();
        this.resizer.on( "resize", () => {
            this.draggable.applyBounds( this.element[ 0 ] );
        });
    }


    load () {
        this.draggable = new window.Draggable(
            this.dragger,
            this.options
        );
    }


    onDragStart () {
        this.element.addClass( "is-drag-start" );
    }


    onDragEnd () {
        this.element.removeClass( "is-drag-start" );
    }


    destroy () {
        if ( this.draggable ) {
            this.draggable.kill();
        }

        if ( this.resizer ) {
            this.resizer.off( "resize" );
            this.resizer.destroy();
        }
    }
}



/**
 *
 * @public
 * @class DragController
 * @param {Hobo} elements The drag modules
 * @classdesc Handles drags
 *
 */
class DragController {
    constructor ( elements ) {
        this.elements = elements;
        this.instances = [];

        this.init();
    }


    init () {
        this.elements.forEach(( element, i ) => {
            this.instances.push( new Drag( this.elements.eq( i ) ) );
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
export default DragController;
