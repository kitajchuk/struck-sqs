import * as core from "../core";
import $ from "properjs-hobo";


export default ( json, data ) => {
    json = json[ 0 ];

    let ret = "";
    const tags = data.tags.split( "," );
    const items = [];

    // Items with matching tags to THIS item
    json.items.forEach(( itm ) => {
        for ( let i = tags.length; i--; ) {
            if ( itm.id !== data.itemId && (itm.tags && itm.tags.indexOf( tags[ i ] ) !== -1) ) {
                items.push( itm );
            }
        }
    });

    const item = core.util.shuffle( items ).pop();
    const image = item ? (item.customContent.relatedImage || item) : null;
    const eventAction = item ? (item.customContent.customType === "customProject" ? "portfolio" : "case-studies") : null;
    const imageTarget = $( data.target );

    //data-variants="${image.systemDataVariants}"

    if ( item ) {
        ret = `
            <a class="related__text__link -column js-gtm-event" data-ec="site interaction" data-ea="${eventAction}" data-el="Related items: ${item.title}" href="${item.fullUrl}">
                <div class="m -caps">${item.title}</div>
                <div class="h4 -fmedium">${item.customContent.relatedBlurb}</div>
                <div class="related__link m -color -plusline -bump">+ <span>${data.cta}</span></div>
            </a>
            <a class="related__img__link -column">
                <img class="image js-lazy-image" data-img-src="${image.assetUrl}" />
            </a>
        `;

        imageTarget[ 0 ].innerHTML = `
            <a class="related__thumb js-gtm-event" data-ec="site interaction" data-ea="${eventAction}" data-el="Related items: ${item.title}" href="${item.fullUrl}">
                <img class="related__image js-lazy-image" data-img-src="${image.assetUrl}" />
            </a>
        `;

    } else {
        ret = `
            <div class="related__text__link -column">
                <div class="m -caps">This is not real</div>
                <div class="h4 -fmedium">Seriously, this is not supposed to be here.</div>
                <div class="related__link m -color -plusline -bump">+ <span>This hash won't work</span></div>
            </div>
            <div class="related__img__link -column">
                <img class="image media__node js-lazy-image" data-img-src="/assets/images/bk-fpo-for-struck.jpg" />
            </div>
        `;

        imageTarget[ 0 ].innerHTML = `
            <img class="related__image media__node js-lazy-image" data-img-src="/assets/images/bk-fpo-for-struck.jpg" />
        `;
    }

    core.util.loadImages( imageTarget.find( ".js-lazy-image" ) );

    return ret;
};
