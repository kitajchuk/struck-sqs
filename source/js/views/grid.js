export default ( json/*, data*/ ) => {
    const items = [].concat( json[ 0 ].items ).concat( json[ 1 ].items );

    return items.map(( item ) => {
        const classMod = (item.customContent.customType === "customProject" ? "4up" : "2up");
        const postType = (item.customContent.customType === "customProject" ? "Project" : "Case Study");
        const aspectRatio = (item.customContent.customType === "customProject" ? "415x492" : "850x492");
        const eventAction = (item.customContent.customType === "customProject" ? "portfolio" : "case-studies");
        const gifClass = (item.customContent.animatedGif ? "grid__item--gif" : "");
        const tagsHtml = item.tags ? item.tags.map(( tag ) => {
            return `<div class="filters__item p -light -column">${tag}</div>`;

        }).join( "" ) : "";

        return item.starred ? `
            <a class="grid__item ${gifClass} grid__item--${classMod} -column js-gtm-event" data-ec="site interaction" data-ea="${eventAction}" data-el="${item.title}" href="${item.fullUrl}">
                <div class="grid__item-wrap anim anim--tr js-lazy-anim">
                    <div class="grid__image js-lazy-image js-aspect -cover" data-img-src="${item.assetUrl}" data-variants="${item.systemDataVariants}" data-original="${aspectRatio}"></div>
                    <div class="grid__hover">
                        ${item.customContent.animatedGif ? `
                            <div class="grid__gif js-lazy-image js-aspect -cover" data-img-src="${item.customContent.animatedGif.assetUrl}" data-variants="${item.customContent.animatedGif.systemDataVariants}" data-original="${aspectRatio}"></div>
                        ` : ``}
                        <div class="grid__desc cms -light">
                            ${item.excerpt}
                        </div>
                    </div>
                    <div class="grid__info">
                        <div class="grid__title m -light -caps">${item.title}</div>
                        <div class="grid__meta">
                            ${tagsHtml}
                        </div>
                    </div>
                    <div class="grid__cta">
                        <div class="p -fbold -light">+ <span>View ${postType}</span></div>
                    </div>
                </div>
            </a>

        ` : ``;

    }).join( "" );
};
