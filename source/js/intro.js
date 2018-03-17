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
        this.delay = 80;
        this.ids = [
            { id: "love", el: core.dom.intro.find( ".love" ) },
            { id: "fight", el: core.dom.intro.find( ".fight" ) },
            { id: "adapt", el: core.dom.intro.find( ".adapt" ) }
        ];

        return new Promise(( resolve, reject ) => {
            this.resolve = resolve;
            this.reject = reject;
            this.anim();
        });
    },


    anim () {
        const obj = this.ids.shift();
        const len = obj.el.find( "path" ).length;

        obj.el.addClass( "is-animated" );

        setTimeout(() => {
            if ( !this.ids.length ) {
                this.done();

            } else {
                this.anim();
            }

        }, (this.duration + (this.delay * len) + this.duration) );
    },


    done () {
        setTimeout(() => {
            core.emitter.fire( "app--intro-teardown" );
            core.dom.intro.addClass( "is-animated" );
            this.resolve();

        }, this.duration * 4 );
    }
};


/******************************************************************************
 * Export
*******************************************************************************/
export default intro;
