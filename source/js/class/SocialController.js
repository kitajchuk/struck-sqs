import $ from "properjs-hobo";
import * as core from "../core";
import viewInstagram from "../views/instagram";



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

        this.load();
    }


    load () {
        if ( this.igEl.length ) {
            this.loadIG();
        }
    }


    loadIG () {
        this.igID = "19123138";
        this.igToken = "19123138.dd20812.84764c7c6cb44d15a805837b76fdc017";

        $.ajax({
            url: `https://api.instagram.com/v1/users/${this.igID}/media/recent`,
            method: "GET",
            dataType: "jsonp",
            data: {
                access_token: this.igToken
            }

        }).then(( json ) => {
            this.igEl[ 0 ].innerHTML = viewInstagram( json );
            core.util.loadImages( this.igEl.find( core.config.lazyImageSelector ) );
        });
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default SocialController;
