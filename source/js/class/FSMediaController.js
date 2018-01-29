import * as core from "../core";
import ResizeController from "properjs-resizecontroller";


/**
 *
 * @public
 * @global
 * @class FSMedia
 * @classdesc Handle media inline like background-size: cover.
 *
 */
class FSMedia {
    constructor ( element ) {
        this.element = element;
        this.mediaNode = this.element.find( ".js-media-node" );

        if ( this.mediaNode.length ) {
            this.mediaData = this.mediaNode.data();
            this.mediaDims = core.util.getOriginalDims( this.mediaData.original );
            this.mediaRatio = this.mediaDims.width / this.mediaDims.height;
            this.resizer = new ResizeController();

            this.bind();
            this.onresize();
        }
    }


    bind () {
        this.resizer.on( "resize", this.onresize.bind( this ) );
    }


    onresize () {
        const nodeRect = this.element[ 0 ].getBoundingClientRect();
        const windowRatio = nodeRect.width / nodeRect.height;
        const adjustRatio = this.mediaRatio / windowRatio;
        let mediaWidth = null;

        if ( windowRatio < this.mediaRatio ) {
            mediaWidth = nodeRect.width * adjustRatio;

        } else {
            mediaWidth = nodeRect.width;
        }

        this.mediaNode[ 0 ].style.width = `${mediaWidth}px`;
        this.mediaNode[ 0 ].width = mediaWidth;
    }


    destroy () {
        this.resizer.off( "resize" );
        this.resizer.destroy();
        this.resizer = null;
    }
}



class FSMediaController {
    constructor ( elements ) {
        this.elements = elements;
        this.instances = [];

        this.init();
    }


    init () {
        this.elements.forEach(( element, i ) => {
            this.instances.push( new FSMedia( this.elements.eq( i ) ) );
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
export default FSMediaController;
