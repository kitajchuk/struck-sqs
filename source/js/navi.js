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
        this.trigger = core.dom.body.find( ".js-controller--navi" );
        this.contact = core.dom.contact;
        this.contactTrigger = core.dom.body.find( ".js-controller--contact" );
        this.bind();
    },


    bind () {
        this.trigger.on( "click", () => {
            this.toggle();
        });

        this.contactTrigger.on( "click", () => {
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
    },


    closeContact () {
        this.isContactOpen = false;
        core.dom.html.removeClass( "is-contact-open" );
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
