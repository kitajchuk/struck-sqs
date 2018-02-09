import $ from "properjs-hobo";
import viewJob from "../views/job";
import viewJobs from "../views/jobs";
import paramalama from "paramalama";
import AnimateController from "./AnimateController";
import * as core from "../core";



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
        this.all = this.element.find( ".js-jobsboard-all" );
        this.one = this.element.find( ".js-jobsboard-one" );
        this.jobs = this.element.find( ".js-jobsboard-jobs" );
        this.query = paramalama( window.location.search );

        this.load().then(( json ) => {
            this.json = json;

            if ( this.query.career ) {
                this.loadOne();

            } else {
                this.loadAll();
            }
        });
    }


    loadAll () {
        this.all.addClass( "is-active" );
        this.one.addClass( "is-inactive" );
        this.jobs[ 0 ].innerHTML = viewJobs( this.json.jobs );
        this.animController = new AnimateController( this.element.find( core.config.lazyAnimSelector ) );
    }


    loadOne () {
        this.one.addClass( "is-active" );
        this.all.addClass( "is-inactive" );
        this.one[ 0 ].innerHTML = viewJob( this.findJob() );
        this.animController = new AnimateController( this.element.find( core.config.lazyAnimSelector ) );
    }


    findJob () {
        return this.json.jobs.find(( job ) => {
            return (job.id === parseInt( this.query.career, 10 ));
        });
    }


    load () {
        return $.ajax({
            url: `https://api.greenhouse.io/v1/boards/struck/jobs`,
            method: "GET",
            dataType: "jsonp",
            data: {
                content: true
            }
        });
    }


    destroy () {
        if ( this.animController ) {
            this.animController.destroy();
        }
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default JobsboardController;
