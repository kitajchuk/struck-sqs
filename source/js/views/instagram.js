export default ( json ) => {
    return json.data.map(( post ) => {
        return `
            <a class="media instagram__post -column" href="${post.link}" target="_blank">
                <img class="media__node image js-lazy-image" data-img-src="${post.images.standard_resolution.url}" />
            </a>
        `;

    }).join( "" );
};
