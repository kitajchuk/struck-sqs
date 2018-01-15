import * as core from "../core";


export default ( json, data ) => {
    const tags = data.tags.split( "," );
    const items = [];

    json.items.forEach(( itm ) => {
        for ( let i = tags.length; i--; ) {
            if ( itm.id !== data.itemId && itm.tags.indexOf( tags[ i ] ) !== -1 ) {
                items.push( itm );
            }
        }
    });

    const item = core.util.shuffle( items ).pop();
    const image = item ? (item.customContent.relatedImage || item) : null;

    //data-variants="${image.systemDataVariants}"

    return item ? `
        <div class="related__info -column -vtop">
            <div class="m -caps">${item.title}</div>
            <div class="h4 -fmedium">${item.customContent.relatedBlurb}</div>
            <div class="-bump3">
                <a class="m -color -plusline" href="${item.fullUrl}">+ <span>${data.cta}</span></a>
            </div>
        </div>
        <div class="related__image -column -vtop">
            <div class="media -wrapl">
                <img class="media__node js-lazy-image -wrapl" data-img-src="${image.assetUrl}" />
            </div>
        </div>
    ` : ``;
};
