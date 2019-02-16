import $ from "properjs-hobo";



export default ( json ) => {
    const mainContent = $( json.mainContent );
    const gramBlock = mainContent.find( ".sqs-block-instagram" );

    const gramImages = gramBlock.find( ".thumb-image" );

    return gramImages.map(( el, i ) => {
        const image = gramImages.eq( i );
        const anchor = image.closest( ".image-slide-anchor" );
        const imageData = image.data();

        return `
            <a class="media instagram__post -column anim anim--tr js-lazy-anim" href="${anchor[ 0 ].href}" target="_blank">
                <div class="media__node js-lazy-image -full -square -cover" data-img-src="${imageData.src}"></div>
            </a>
        `;

    }).join( "" );
};
