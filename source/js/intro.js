import * as core from "./core";


/**
 *
 * @public
 * @namespace intro
 * @description Performs the branded load-in screen sequence.
 *
 */
const intro = {
    exec () {
        this.duration = 350;
        this.delay = 40;

        // lovefightadapt
        // this.ids = [
        //     { id: "love", el: core.dom.intro.find( ".love" ) },
        //     { id: "fight", el: core.dom.intro.find( ".fight" ) },
        //     { id: "adapt", el: core.dom.intro.find( ".adapt" ) }
        // ];

        // experienceaffinity
        this.ids = [
            { id: "experience", el: core.dom.intro.find( ".experience" ) },
            { id: "affinity", el: core.dom.intro.find( ".affinity" ) }
        ];

        return new Promise(( resolve, reject ) => {
            this.resolve = resolve;
            this.reject = reject;
            this.anim();
        });
    },


    anim () {
        const obj = this.ids.shift();
        const len = obj.el.find( "path, rect, polygon" ).length;

        obj.el.addClass( "is-animated" );

        setTimeout(() => {
            if ( !this.ids.length ) {
                this.done();

            } else {
                this.anim();
            }

        }, (this.duration + (this.delay * len)) );
    },


    done () {
        setTimeout(() => {
            core.emitter.fire( "app--intro-teardown" );
            core.dom.intro.addClass( "is-animated" );
            this.resolve();

        }, this.duration * 2 );
    }
};


/******************************************************************************
 * Export
*******************************************************************************/
export default intro;
