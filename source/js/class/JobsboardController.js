import $ from "properjs-hobo";
import viewJob from "../views/job";
import viewJobs from "../views/jobs";
import paramalama from "paramalama";
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

            core.emitter.fire( "app--anim-request" );
        });
    }


    loadAll () {
        this.all.addClass( "is-active" );
        this.one.addClass( "is-inactive" );

        if ( !this.json.jobs.length ) {
            this.all.addClass( "is-nojobs" );

        } else {
            this.jobs[ 0 ].innerHTML = viewJobs( this.json.jobs );
        }
    }


    loadOne () {
        this.one.addClass( "is-active" );
        this.all.addClass( "is-inactive" );
        this.one.find( ".js-jobsboard-one-html" )[ 0 ].innerHTML = viewJob( this.findJob() );
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


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default JobsboardController;
