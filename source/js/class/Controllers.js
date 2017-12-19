import * as core from "../core";
import ImageController from "./ImageController";
import ContactController from "./ContactController";
// import AnimateController from "./AnimateController";
// import VideoController from "./VideoController";
// import AspectController from "./AspectController";
// import CoverController from "./CoverController";


/**
 *
 * @public
 * @global
 * @class Controllers
 * @classdesc Handle controller functions.
 * @param {object} options Optional config
 *
 */
class Controllers {
    constructor ( options ) {
        this.element = options.el;
        this.callback = options.cb;
        this.controllers = [];
    }


    push ( id, elements, controller, conditions ) {
        this.controllers.push({
            id: id,
            elements: elements,
            instance: null,
            Controller: controller,
            conditions: conditions
        });
    }


    init () {
        this.controllers.forEach(( controller ) => {
            if ( controller.elements.length && controller.conditions ) {
                controller.instance = new controller.Controller( controller.elements );
            }
        });
    }


    kill () {
        this.controllers.forEach(( controller ) => {
            if ( controller.instance ) {
                controller.instance.destroy();
            }
        });

        this.controllers = [];
    }


    exec () {
        this.controllers = [];

        // this.push( "video", this.element.find( core.config.videoSelector ), VideoController, true );
        // this.push( "animate", core.dom.body.find( core.config.animSelector ), AnimateController, true );
        // this.push( "cover", core.dom.body.find( core.config.coverSelector ), CoverController, true );
        this.push( "contact", core.dom.body.find( core.config.contactSelector ), ContactController, true );

        // this.aspect = this.element.find( core.config.aspectSelector );
        // this.aspectController = new AspectController( this.aspect );
        this.images = this.element.find( core.config.lazyImageSelector );
        this.imageController = new ImageController( this.images );
        this.imageController.on( "preloaded", () => {
            this.init();

            if ( this.callback ) {
                this.callback();
            }
        });
    }


    destroy () {
        // if ( this.aspectController ) {
        //     this.aspectController.destroy();
        // }

        if ( this.imageController ) {
            this.imageController.destroy();
        }

        this.kill();
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Controllers;
