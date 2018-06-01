import * as core from "../core";
import ImageController from "./ImageController";
import SocialController from "./SocialController";
import JobsboardController from "./JobsboardController";
import ViewController from "./ViewController";
import VideoController from "./VideoController";
import DragController from "./DragController";
import CoverController from "./CoverController";
import AspectController from "./AspectController";
import TogglesController from "./TogglesController";
import FSMediaController from "./FSMediaController";
import AnimateController from "./AnimateController";
import ScrollController from "./ScrollController";
import HitmeController from "./HitmeController";


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

        this.push( "cover", this.element.find( core.config.coverSelector ), CoverController, true );
        this.push( "video", this.element.find( ".sqs-block-video" ), VideoController, true );
        this.push( "view", this.element.find( core.config.viewSelector ), ViewController, true );
        this.push( "fsmedia", this.element.find( core.config.fsmediaSelector ), FSMediaController, true );
        this.push( "toggle", this.element.find( core.config.togglesSelector ), TogglesController, true );
        this.push( "drag", this.element.find( core.config.dragSelector ), DragController, true );
        this.push( "social", this.element.find( core.config.socialSelector ), SocialController, true );
        this.push( "jobsboard", this.element.find( core.config.jobsboardSelector ), JobsboardController, true );
        this.push( "scrolls", this.element, ScrollController, true );
        this.push( "hitme", this.element.find( ".js-hitme" ), HitmeController, true );

        this.images = this.element.find( core.config.lazyImageSelector );
        this.imageController = new ImageController( this.images );
        this.aspects = this.element.find( core.config.aspectSelector );
        this.aspectController = new AspectController( this.aspects );
        this.imageController.on( "preloaded", () => {
            this.init();

            if ( this.callback ) {
                this.callback();
            }
        });
    }


    animate () {
        this.animates = this.element.find( core.config.lazyAnimSelector );
        this.animController = new AnimateController( this.element, this.animates, 10 );
        this.animController.start();
    }


    destroy () {
        if ( this.imageController ) {
            this.imageController.destroy();
        }

        if ( this.aspectController ) {
            this.aspectController.destroy();
        }

        if ( this.animController ) {
            this.animController.destroy();
        }

        this.kill();
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Controllers;
