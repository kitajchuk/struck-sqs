import * as core from "../core";
import $ from "properjs-hobo";
import Store from "../core/Store";


// Singleton
let _instance = null;


/**
 *
 * @public
 * @class Analytics
 * @classdesc Handles Squarespace Metrics and Google Analytics.
 *            @see {@link https://developers.google.com/analytics/devguides/collection/analyticsjs/}
 * @memberof core
 *
 */
class Analytics {
    constructor () {
        if ( !_instance ) {
            core.emitter.on( "app--analytics-pageview", this.doPageView.bind( this ) );

            core.log( "Analytics initialized" );

            if ( !core.env.isConfig() ) {
                this.bind();
                this.lazy();
            }

            _instance = this;
        }

        return _instance;
    }


    lazy () {
        const labels = core.dom.body.find( ".js-gtm-event--lazy-el" );
        const actions = core.dom.body.find( ".js-gtm-event--lazy-ea" );

        labels.forEach(( el, i ) => {
            const elem = labels.eq( i );

            elem.attr( "data-el", elem[ 0 ].innerText.replace( /\n/g, " " ) );
        });

        actions.forEach(( el, i ) => {
            const elem = actions.eq( i );
            const action = elem.data( "ea" ) || "";

            elem.attr( "data-ea", action.replace( /^\/|\/$/g, "" ) );
        });
    }


    bind () {
        core.dom.body.on( "click", ".js-gtm-event", ( e ) => {
            if ( window.dataLayer ) {
                const target = $( e.target );
                const eventEl = target.is( ".js-gtm-event" ) ? target : target.closest( ".js-gtm-event" );
                const eventData = eventEl.data();

                this.doEvent(
                    eventData.ec,
                    eventData.ea,
                    eventData.el,
                    "FALSE"
                );
            }
        });
    }


    doEvent ( ec, ea, el, nie ) {
        if ( window.dataLayer ) {
            window.dataLayer.push({
                event: "struckEventTracking",
                struckEC: ec,
                struckEA: ea,
                struckEL: el,
                NonInteractionEvent: nie
            });

            core.log( "Analytics GTM Event", ec, ea, el, nie );
        }
    }


    doSQSPageView ( pageTitle, websiteId, pageData ) {
        this.recordHit( websiteId, pageData, pageTitle )
            .then(() => {
                core.log( "Analytics SQS Pageview" );

            }).catch(( error ) => {
                core.log( "warn", error );
            });
    }


    doGTMPageView () {
        if ( window.dataLayer ) {
            window.dataLayer.push({
                "gtm.start": Date.now(),
                "event": "gtm.js"
            });

            core.log( "Analytics GTM Pageview" );
        }
    }


    /**
     *
     * @public
     * @method doPageView
     * @param {object} doc The doc object created by router {$doc, $page, pageData, pageHtml}
     * @memberof class.Analytics
     * @description Parse static context from responseText and track it.
     *
     */
    doPageView ( doc ) {
        const pageTitle = (doc.data.itemTitle || doc.data.collectionTitle);
        const websiteId = doc.data.websiteId;
        const pageData = doc.data.itemId ? { itemId: doc.data.itemId } : { collectionId: doc.data.collectionId };

        // Squarespace Metrics
        this.doSQSPageView( pageTitle, websiteId, pageData );

        // Google Tag Manager
        this.doGTMPageView();

        // Update document title
        this.setDocumentTitle( pageTitle );

        // Set lazy Event Labels for squarespace block-field content
        if ( !core.env.isConfig() ) {
            this.lazy();
        }
    }


    /**
     *
     * @public
     * @method setDocumentTitle
     * @param {string} title The new title for the document
     * @memberof class.Analytics
     * @description Update the documents title.
     *
     */
    setDocumentTitle ( title ) {
        document.title = title;
    }


    /**
     *
     * @public
     * @method recordHit
     * @param {string} websiteId The site ID
     * @param {object} pageData IDs for either collection or item
     * @param {string} websiteTitle Page title for tracking
     * @memberof class.Analytics
     * @description Record sqs metrics for async page requests.
     *              Returned Promise resolves with a data {object}
     * @returns {Promise}
     *
     */
    recordHit ( websiteId, pageData, websiteTitle ) {
        const datas = {
            url: window.location.href,
            queryString: window.location.search,
            userAgent: window.navigator.userAgent,
            referrer: "",
            localStorageSupported: Store.isStorageSupported,
            viewportInnerHeight: window.innerHeight,
            viewportInnerWidth: window.innerWidth,
            screenHeight: window.screen.height,
            screenWidth: window.screen.width,
            title: websiteTitle,
            websiteId: websiteId,
            templateId: websiteId
        };

        if ( pageData.itemId ) {
            datas.itemId = pageData.itemId;

        } else {
            datas.collectionId = pageData.collectionId;
        }

        return $.ajax({
            url: `/api/census/RecordHit?crumb=${Store.crumb}`,
            method: "POST",
            data: {
                event: "View",
                data: JSON.stringify( datas )
            },
            dataType: "json",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Analytics;
