import * as core from "./core";


/**
 *
 * @public
 * @namespace navi
 * @description Performs the branded load-in screen sequence.
 * @memberof menus
 *
 */
const navi = {
    /**
     *
     * @public
     * @method init
     * @memberof menus.navi
     * @description Method initializes navi node in DOM.
     *
     */
    init () {
        this.isOpen = false;
        this.isContactOpen = false;
        this.element = core.dom.navi;
        this.items = this.element.find( ".js-navi-a" );
        this.contact = core.dom.contact;
        this.bind();
    },


    bind () {
        core.dom.body.on( "click", ".js-controller--navi", () => {
            this.toggle();
        });

        core.dom.body.on( "click", ".js-controller--contact", () => {
            this.toggleContact();
        });
    },


    open () {
        this.isOpen = true;
        core.dom.html.addClass( "is-navi-open" );
    },


    openContact () {
        this.isContactOpen = true;
        core.dom.html.addClass( "is-contact-open" );
    },


    close () {
        this.isOpen = false;
        core.dom.html.removeClass( "is-navi-open" );

        this.closeContact();
    },


    closeContact () {
        this.isContactOpen = false;
        core.dom.html.removeClass( "is-contact-open" );

        core.emitter.fire( "app--contactclose" );
    },


    active ( view ) {
        this.items.removeClass( "is-active" );
        this.items.filter( `.js-navi--${view}` ).addClass( "is-active" );
    },


    toggle () {
        if ( this.isOpen ) {
            this.close();

        } else {
            this.open();
        }
    },


    toggleContact () {
        if ( this.isContactOpen ) {
            this.closeContact();

        } else {
            this.openContact();
        }
    }
};


/******************************************************************************
 * Export
*******************************************************************************/
export default navi;
