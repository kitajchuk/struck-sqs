export default ( json ) => {
    return json.data.map(( post ) => {
        return `
            <a class="media instagram__post -column" href="${post.link}" target="_blank">
                <div class="media__node js-lazy-image -full -square -cover" data-img-src="${post.images.standard_resolution.url}"></div>
            </a>
        `;

    }).join( "" );
};
