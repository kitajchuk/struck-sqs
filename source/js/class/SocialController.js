import $ from "properjs-hobo";
import * as core from "../core";
import viewInstagram from "../views/instagram";
import viewMedium from "../views/medium";



/**
 *
 * @public
 * @global
 * @class SocialController
 * @classdesc Handle social module integrations.
 *
 */
class SocialController {
    constructor ( element ) {
        this.element = element;
        this.igEl = this.element.find( ".js-social-instagram" );
        this.mdEl = this.element.find( ".js-social-medium" );

        this.load();
    }


    load () {
        if ( this.igEl.length ) {
            this.loadIG();
        }

        if ( this.mdEl.length ) {
            this.loadMD();
        }
    }


    loadMD () {
        $.ajax({
            url: "https://hook.io/struck/medium",
            method: "GET",
            dataType: "json"

        }).then(( json ) => {
            this.mdEl[ 0 ].innerHTML = viewMedium( json );
            core.util.loadImages( this.mdEl.find( core.config.lazyImageSelector ) );
            core.emitter.fire( "app--anim-request" );
        });
    }


    loadIG () {
        $.ajax({
            url: `/struck-instagram/`,
            method: "GET",
            dataType: "json",
            data: {
                format: "json"
            }

        }).then(( json ) => {
            this.igEl[ 0 ].innerHTML = viewInstagram( json );
            core.util.loadImages( this.igEl.find( core.config.lazyImageSelector ) );
            core.emitter.fire( "app--anim-request" );
        });
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default SocialController;
