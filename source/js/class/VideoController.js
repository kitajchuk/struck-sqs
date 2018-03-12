// import $ from "properjs-hobo";
import * as core from "../core";
import videoView from "../views/video";
import Analytics from "./Analytics";



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
        this.analytics = new Analytics();
        this.milestones = [
            { hit: 25, met: false },
            { hit: 50, met: false },
            { hit: 75, met: false },
            { hit: 100, met: false }
        ];

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

        this.element
            .on( "mouseenter", ".js-embed-playbtn", () => {
                this.element.addClass( "is-play-button" );

            }).on( "mouseleave", ".js-embed-playbtn", () => {
                this.element.removeClass( "is-play-button" );
            });
    }


    load () {
        this.image = this.element.find( "img" );
        this.data.imageJson = this.image.data();
        this.element[ 0 ].innerHTML = videoView( this.data.blockJson, this.data.imageJson );
        this.iframe = this.element.find( ".js-embed-iframe" );
        this.iframe[ 0 ].src = this.iframe.data().src;

        core.util.loadImages( this.element.find( core.config.lazyImageSelector ), core.util.noop );
        core.emitter.fire( "app--anim-request" );
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
        const data = JSON.parse( e.data );
        const title = this.data.blockJson.html.match( /title\=\"(.*?)\"/ );

        if ( data.event === "ready" ) {
            this.postEmbed( "addEventListener", "play" );
            this.postEmbed( "addEventListener", "pause" );
            this.postEmbed( "addEventListener", "finish" );
            this.postEmbed( "addEventListener", "playProgress" );

        } else if ( data.event === "play" ) {
            this.isPlaying = true;
            this.element.addClass( "is-embed-playing" );
            this.analytics.doEvent(
                "video",
                "play",
                (title ? title[ 1 ] : "TitleNotParsed"),
                "FALSE"
            );

        } else if ( data.event === "pause" ) {
            this.isPlaying = false;
            this.analytics.doEvent(
                "video",
                "pause",
                (title ? title[ 1 ] : "TitleNotParsed"),
                "FALSE"
            );

        } else if ( data.event === "finish" ) {
            this.isPlaying = false;
            this.element.removeClass( "is-embed-playing" );

        } else if ( data.event === "playProgress" ) {
            this.milestones.forEach(( milestone ) => {
                const percent = data.data.percent * 100;

                if ( percent >= milestone.hit && !milestone.met ) {
                    milestone.met = true;
                    this.analytics.doEvent(
                        "video",
                        `${milestone.hit}%`,
                        (title ? title[ 1 ] : "TitleNotParsed"),
                        "FALSE"
                    );
                }
            });
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
