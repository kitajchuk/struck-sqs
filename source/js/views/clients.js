export default ( json ) => {
    return json.items.map(( item ) => {
        return `<div class="touts__item -column">
            <div class="touts__media">
                <img class="touts__image js-lazy-image" data-img-src="${item.assetUrl}" />
            </div>
            <div class="touts__text p -bump3">
                ${item.body}
            </div>
        </div>`;

    }).join( "" );
};
