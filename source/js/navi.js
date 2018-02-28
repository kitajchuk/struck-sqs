import * as core from "./core";
import Analytics from "./class/Analytics";
import ContactController from "./class/ContactController";
import AnimateController from "./class/AnimateController";


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
        this.analytics = new Analytics();
        this.contact = new ContactController();
        this.animNavis = this.element.find( core.config.lazyAnimSelector );
        this.animContacts = core.dom.contact.find( core.config.lazyAnimSelector );
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

        this.animNaviController = new AnimateController( this.element, this.animNavis, 10 );
        this.animNaviController.noop();
    },


    openContact () {
        this.isContactOpen = true;
        core.dom.html.addClass( "is-contact-open" );
        this.analytics.doEvent(
            "form",
            "form impression",
            "Contact Form",
            "TRUE"
        );

        this.animContactController = new AnimateController( this.element, this.animContacts, 10 );
        this.animContactController.noop();
    },


    close () {
        this.isOpen = false;
        core.dom.html.removeClass( "is-navi-open" );

        if ( this.animNaviController ) {
            this.animNaviController.destroy();
            this.animNavis.removeClass( "is-animated" );
        }

        this.closeContact();
    },


    closeContact () {
        this.isContactOpen = false;
        core.dom.html.removeClass( "is-contact-open" );

        if ( this.animContactController ) {
            this.animContactController.destroy();
            this.animContacts.removeClass( "is-animated" );
        }

        this.contact.clear();
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
