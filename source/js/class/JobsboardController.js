import $ from "properjs-hobo";
import viewJobs from "../views/jobs";
// import * as core from "../core";



/**
 *
 * @public
 * @global
 * @class JobsboardController
 * @classdesc Handle Greenhouse.io job board integration.
 *
 */
class JobsboardController {
    constructor ( element ) {
        this.element = element;

        this.load();
    }


    load () {
        $.ajax({
            url: `https://api.greenhouse.io/v1/boards/struck/jobs`,
            method: "GET",
            dataType: "jsonp",
            data: {
                content: true
            }

        }).then(( json ) => {
            this.element[ 0 ].innerHTML = viewJobs( json );
        });
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default JobsboardController;
