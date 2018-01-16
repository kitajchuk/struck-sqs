export default ( json/*, data*/ ) => {
    const items = [].concat( json[ 0 ].items ).concat( json[ 1 ].items );

    return items.map(( item ) => {
        let hoverHtml = "";
        const classMod = (item.customContent.customType === "customProject" ? "4up" : "2up");
        const aspectRatio = (item.customContent.customType === "customProject" ? "415x492" : item.originalSize);
        const postType = (item.customContent.customType === "customProject" ? "Project" : "Case Study");
        const tagsHtml = item.tags.map(( tag ) => {
            return `<div class="filters__item p -light -column">${tag}</div>`;

        }).join( "" );

        if ( item.customContent.hasHoverstate ) {
            hoverHtml = `<div class="grid__desc cms -light">
                ${item.excerpt}
            </div>`;

        } else if ( item.customContent.spotColor ) {
            hoverHtml = `<div class="grid__color" style="background-color:${item.customContent.spotColor};"></div>`;
        }

        return item.starred ? `
            <a class="grid__item grid__item--${classMod} -column" href="${item.fullUrl}">
                <div class="grid__item-wrap">
                    <div class="grid__image js-lazy-image js-aspect -cover" data-img-src="${item.assetUrl}" data-variants="${item.systemDataVariants}" data-original="${aspectRatio}"></div>
                    <div class="grid__hover">
                        ${hoverHtml}
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
