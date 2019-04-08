import * as core from "../core";
import videoView from "../views/video";
import Analytics from "./Analytics";
import ResizeController from "properjs-resizecontroller";



// Local public instances hash ( resets )
let _instances = {};
const _onMessageInstance = ( message, instance ) => {
    const title = instance.data.blockJson.html.match( /title\=\"(.*?)\"/ );
    const isSelf = (message.player_id && message.player_id === instance.id);

    if ( message.event === "ready" && isSelf ) {
        instance.postEmbed( "addEventListener", "play" );
        instance.postEmbed( "addEventListener", "pause" );
        instance.postEmbed( "addEventListener", "finish" );
        instance.postEmbed( "addEventListener", "playProgress" );

    } else if ( message.event === "play" && isSelf ) {
        instance.isPlaying = true;
        instance.element.addClass( "is-embed-playing" );
        instance.analytics.doEvent(
            "video",
            "play",
            (title ? title[ 1 ] : "TitleNotParsed"),
            "FALSE"
        );

    } else if ( message.event === "pause" && isSelf ) {
        instance.isPlaying = false;
        instance.analytics.doEvent(
            "video",
            "pause",
            (title ? title[ 1 ] : "TitleNotParsed"),
            "FALSE"
        );

    } else if ( message.event === "finish" && isSelf ) {
        instance.isPlaying = false;
        instance.element.removeClass( "is-embed-playing" );

    } else if ( message.event === "playProgress" && isSelf ) {
        instance.milestones.forEach(( milestone ) => {
            const percent = message.data.percent * 100;

            if ( percent >= milestone.hit && !milestone.met ) {
                milestone.met = true;
                instance.analytics.doEvent(
                    "video",
                    `${milestone.hit}%`,
                    (title ? title[ 1 ] : "TitleNotParsed"),
                    "FALSE"
                );
            }
        });
    }
};

// Local public window.onmessage binding ( once )
window.addEventListener( "message", ( e ) => {
    const message = JSON.parse( e.data );
    const instance = _instances[ message.player_id ];

    if ( instance ) {
        _onMessageInstance( message, instance );
    }

}, false );



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
        this.resizer = new ResizeController();

        this.bind();
        this.load();
        this.push();
    }


    push () {
        if ( !_instances[ this.id ] ) {
            _instances[ this.id ] = this;
        }
    }


    load () {
        this.image = this.element.find( "img" );
        this.data.imageJson = this.image.data();
        this.element[ 0 ].innerHTML = videoView( this.data.blockJson, this.data.imageJson );
        this.iframe = this.element.find( ".js-embed-iframe" );
        this.filter = this.element.find( ".js-embed-filter" );
        this.id = this.iframe[ 0 ].id;

        core.util.loadImages( this.element.find( core.config.lazyImageSelector ), core.util.noop );
        core.emitter.fire( "app--anim-request" );
        this.onResize();
    }


    bind () {
        this.element.on( "click", ".js-embed-playbtn", () => {
            if ( !this.isPlaying ) {
                this.play();
            }
        });

        this.element.on( "mouseenter", ".js-embed-playbtn", () => {
            this.element.addClass( "is-play-button" );

        }).on( "mouseleave", ".js-embed-playbtn", () => {
            this.element.removeClass( "is-play-button" );
        });

        this.resizer.on( "resize", this.onResize.bind( this ) );
    }


    onResize () {
        if ( this.filter ) {
            const frameBox = this.iframe[ 0 ].getBoundingClientRect();

            this.filter[ 0 ].style.width = `${frameBox.width}px`;
            this.filter[ 0 ].style.height = `${frameBox.height}px`;
        }
    }


    postEmbed ( method, value ) {
        const data = {
            method
        };

        if ( value ) {
            data.value = value;
        }

        const message = JSON.stringify( data );

        this.iframe[ 0 ].contentWindow.postMessage( message, "*" );
    }


    play () {
        this.postEmbed( "play", "true" );
        this.isPlaying = true;
        this.element.addClass( "is-embed-playing" );
        this.iframe[ 0 ].src = this.iframe.data().src;
    }


    destroy () {
        if ( this.resizer ) {
            this.resizer.off( "resize" );
            this.resizer.destroy();
            this.resizer = null;
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

        // Reset local public instances
        _instances = {};
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default VideoController;
