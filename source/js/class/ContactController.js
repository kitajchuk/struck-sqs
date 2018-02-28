import $ from "properjs-hobo";
import * as core from "../core";
import Analytics from "./Analytics";



// Singleton
let _instance = null;



/**
 *
 * @public
 * @global
 * @class ContactController
 * @classdesc Handle contact form posting — hooked into Squarespace integration.
 *
 */
class ContactController {
    constructor () {
        if ( !_instance ) {
            this.element = core.dom.contact;
            this.form = this.element.find( ".js-contact-form" );
            this.fields = this.element.find( ".js-contact-field" );
            this.submit = this.element.find( ".js-contact-submit" );
            this.reset = this.element.find( ".js-contact-reset" );
            this.analytics = new Analytics();
            this.data = {};

            this.bind();

            _instance = this;
        }

        return _instance;
    }


    bind () {
        this.reset.on( "click", () => {
            this.clear();
        });

        this.submit.on( "click", () => {
            this.gather();
            this.send();
        });
    }


    clear () {
        this.data = {};
        this.fields.removeClass( "is-error" ).forEach(( el ) => {
            el.value = "";
        });
    }


    getKey () {
        return $.ajax({
            url: "/api/form/FormSubmissionKey",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            dataType: "json"
        });
    }


    /*{
        // Name
        "text-yui_3_17_2_1_1513626979285_41600": "",
        // Company
        "text-yui_3_17_2_1_1513626979285_24222": "",
        // Email
        "email-yui_3_17_2_1_1513626979285_25400": "",
        // Phone
        "phone-yui_3_17_2_1_1513626979285_43483": ["", "", "", ""],
        // Message
        "textarea-yui_3_17_2_17_1513626979285_3714": ""
    }*/
    saveForm ( key ) {
        return $.ajax({
            url: "/api/form/SaveFormSubmission",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            dataType: "json",
            payload: {
                collectionId: "5a381e53085229e36d2161f3",
                form: JSON.stringify( this.data ),
                formId: "5a381f510d92972a19baf7e0",
                key,
                objectName: "page-5a381e53085229e36d2161f3",
                pageId: "5a381e53085229e36d2161f3",
                pagePath: "/contact/",
                pageTitle: "Contact"
            }
        });
    }


    gather () {
        this.data = {};
        this.fields.forEach(( el ) => {
            this.data[ el.name ] = el.value;
        });
    }


    handle ( response ) {
        if ( response && response.errors ) {
            for ( const i in response.errors ) {
                if ( response.errors.hasOwnProperty( i ) ) {
                    this.fields.filter( `[name='${i}']` ).addClass( "is-error" );
                }
            }

            this.analytics.doEvent(
                "form",
                "form submit: error",
                "Contact Form",
                "FALSE"
            );

        } else {
            this.clear();

            this.analytics.doEvent(
                "form",
                "form submit: success",
                "Contact Form",
                "FALSE"
            );
        }
    }


    send () {
        this.fields.removeClass( "is-error" );
        this.getKey().then(( json ) => {
            this.saveForm( json.key ).then(( response ) => {
                this.handle( response );

            }).catch(( response ) => {
                this.handle( response );
            });

        }).catch(() => {
            this.analytics.doEvent(
                "form",
                "form submit: error",
                "Contact Form",
                "FALSE"
            );
        });
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default ContactController;
