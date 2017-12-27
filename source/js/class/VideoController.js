import $ from "properjs-hobo";
import * as core from "../core";
import videoView from "../views/video";



/**
 *
 * @public
 * @global
 * @class Video
 * @classdesc Handle video logics.
 *
 */
class Video {
    constructor ( element ) {
        this.element = element;
        this.parent = this.element.parent();
        this.data = this.element.data();
        this.isPlaying = false;

        this.bind();
        this.load();
    }


    bind () {
        this._onMessage = this.onMessage.bind( this );
        window.addEventListener( "message", this._onMessage, false );

        this.element.on( "click", ".js-embed-playbtn", () => {
            if ( !this.isPlaying ) {
                this.play();
            }
        });
    }


    load () {
        this.element.detach();

        $.ajax({
            url: `/api/content-items/${this.data.blockJson.customThumb}`,
            method: "GET",
            dataType: "json"

        }).then(( json ) => {
            this.data.contentJson = json;
            this.element[ 0 ].innerHTML = videoView( this.data.blockJson, this.data.contentJson );
            this.parent.append( this.element );
            this.iframe = this.element.find( ".js-embed-iframe" );
            this.iframe[ 0 ].src = this.iframe.data().src;

            core.util.loadImages( this.element.find( core.config.lazyImageSelector ), core.util.noop );
        });
    }


    postEmbed ( method, value ) {
        const data = {
            value,
            method
        };
        const message = JSON.stringify( data );

        this.iframe[ 0 ].contentWindow.postMessage( message, "*" );
    }


    onMessage ( e ) {
        if ( e.data ) {
            const data = JSON.parse( e.data );

            if ( data.event === "ready" ) {
                this.postEmbed( "addEventListener", "play" );
                this.postEmbed( "addEventListener", "pause" );
                this.postEmbed( "addEventListener", "finish" );

            } else if ( data.event === "play" ) {
                this.isPlaying = true;
                this.element.addClass( "is-embed-playing" );

            } else if ( data.event === "pause" ) {
                this.isPlaying = false;

            } else if ( data.event === "finish" ) {
                this.isPlaying = false;
                this.element.removeClass( "is-embed-playing" );
            }
        }
    }


    play () {
        this.postEmbed( "play", "" );
    }


    destroy () {
        if ( this._onMessage ) {
            window.removeEventListener( "message", this._onMessage, false );
        }
    }
}



/**
 *
 * @public
 * @class VideoController
 * @param {Hobo} elements The video modules
 * @classdesc Handles videos
 *
 */
class VideoController {
    constructor ( elements ) {
        this.elements = elements;
        this.instances = [];

        this.init();
    }


    init () {
        this.elements.forEach(( element, i ) => {
            this.instances.push( new Video( this.elements.eq( i ) ) );
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
export default VideoController;
