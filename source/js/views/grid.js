export default ( json/*, data*/ ) => {
    const items = [].concat( json[ 0 ].items ).concat( json[ 1 ].items );

    return items.map(( item ) => {
        const classMod = (item.customContent.customType === "customProject" ? "4up" : "2up");
        const postType = (item.customContent.customType === "customProject" ? "Project" : "Case Study");
        const gridImage = (item.customContent.animatedGif ? item.customContent.animatedGif : item);
        const aspectRatio = (item.customContent.customType === "customProject" ? "415x492" : "850x492");
        const tagsHtml = item.tags ? item.tags.map(( tag ) => {
            return `<div class="filters__item p -light -column">${tag}</div>`;

        }).join( "" ) : "";

        return item.starred ? `
            <a class="grid__item grid__item--${classMod} -column" href="${item.fullUrl}">
                <div class="grid__item-wrap anim anim--tr js-lazy-anim">
                    <div class="grid__image js-lazy-image js-aspect -cover" data-img-src="${gridImage.assetUrl}" data-variants="${gridImage.systemDataVariants}" data-original="${aspectRatio}"></div>
                    ${item.customContent.spotColor ? `
                        <div class="grid__color" style="background-color:${item.customContent.spotColor};"></div>
                    ` : `
                        <div class="grid__hover">
                            <div class="grid__desc cms -light">
                                ${item.excerpt}
                            </div>
                        </div>
                    `}
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
