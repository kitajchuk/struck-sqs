import * as core from "../core";


export default ( json, data ) => {
    json = json[ 0 ];

    const tags = data.tags.split( "," );
    const items = [];

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

    //data-variants="${image.systemDataVariants}"

    return item ? `
        <div class="related__info -column -vtop">
            <div class="m -caps">${item.title}</div>
            <div class="h4 -fmedium">${item.customContent.relatedBlurb}</div>
            <div class="-bump3">
                <a class="m -color -plusline js-gtm-event" data-ec="site interaction" data-ea="${eventAction}" data-el="Related items: ${item.title}" href="${item.fullUrl}">+ <span>${data.cta}</span></a>
            </div>
        </div>
        <div class="related__image -column -vtop">
            <div class="media -wrapl">
                <img class="media__node js-lazy-image -wrapl" data-img-src="${image.assetUrl}" />
            </div>
        </div>

    ` : `
        <div class="related__info -column -vtop">
            <div class="m -caps">This is not real</div>
            <div class="h4 -fmedium">Seriously, this is not supposed to be here.</div>
            <div class="-bump3">
                <a class="m -color -plusline" href="https://giphy.com/gifs/skateboarding-skateboard-kick-flip-3oEdv5FXteGY8iS8CY" target="_blank">+ <span>But check this out</span></a>
            </div>
        </div>
        <div class="related__image -column -vtop">
            <div class="media -wrapl">
                <img class="related__fpo media__node js-lazy-image -wrapl" data-img-src="https://static1.squarespace.com/static/58e7dfe8bf629ae56bff881b/t/5a96fb2c24a694718d39eaf3/1519844145290/giphy-downsized.gif?format=original" />
            </div>
        </div>
    `;
};
