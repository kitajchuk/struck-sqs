import * as core from "../core";
import ImageController from "./ImageController";
import ContactController from "./ContactController";
import SocialController from "./SocialController";
import JobsboardController from "./JobsboardController";
import ViewController from "./ViewController";
import VideoController from "./VideoController";
import DragController from "./DragController";
import CoverController from "./CoverController";
import AspectController from "./AspectController";
import TogglesController from "./TogglesController";
import FSMediaController from "./FSMediaController";


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

        this.push( "video", core.dom.body.find( ".sqs-block-video" ), VideoController, true );
        this.push( "contact", core.dom.body.find( core.config.contactSelector ), ContactController, true );
        this.push( "social", core.dom.body.find( core.config.socialSelector ), SocialController, true );
        this.push( "jobsboard", core.dom.body.find( core.config.jobsboardSelector ), JobsboardController, true );
        this.push( "view", core.dom.body.find( core.config.viewSelector ), ViewController, true );
        this.push( "drag", core.dom.body.find( core.config.dragSelector ), DragController, true );
        this.push( "cover", core.dom.body.find( core.config.coverSelector ), CoverController, true );
        this.push( "toggle", core.dom.body.find( core.config.togglesSelector ), TogglesController, true );
        this.push( "fsmedia", core.dom.body.find( core.config.fsmediaSelector ), FSMediaController, true );

        this.images = this.element.find( core.config.lazyImageSelector );
        this.imageController = new ImageController( this.images );
        this.imageController.on( "preloaded", () => {
            this.aspects = this.element.find( core.config.aspectSelector );
            this.aspectController = new AspectController( this.aspects );
            this.init();

            if ( this.callback ) {
                this.callback();
            }
        });
    }


    destroy () {
        if ( this.imageController ) {
            this.imageController.destroy();
        }

        if ( this.aspectController ) {
            this.aspectController.destroy();
        }

        this.kill();
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Controllers;
