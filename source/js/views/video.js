export default ( blockJson, imageJson ) => {
    const url = blockJson.url.replace( /\?.*?$/, "" );
    const path = "https://player.vimeo.com/video/";
    const id = url.split( "/" ).pop();
    const qrs = `?&wmode=opaque&api=1&loop=0&autoplay=1&player_id=${id}`;
    const source = `${path}${id}${qrs}`;
    const aspect = (blockJson.height || 9) / (blockJson.width || 16) * 100;
    const original = `${(blockJson.width || 16)}x${(blockJson.height || 9)}`;

    return `
        <div class="embed js-embed">
            <div class="embed__aspect" style="padding-bottom:${aspect}%;">
                <iframe id="${id}" class="embed__element js-embed-iframe js-media-node" data-src="${source}" data-original="${original}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </div>

            <div class="embed__poster embed__overlay js-embed-poster js-lazy-image -cover -text--center" data-img-src="${imageJson.src}?format=${imageJson.imageResolution || 'original'}"></div>
            <div class="embed__clipper">
                <div class="embed__filter js-embed-filter js-lazy-image -cover" data-img-src="${imageJson.src}?format=${imageJson.imageResolution || 'original'}"></div>
            </div>
            <div class="embed__playbtn js-embed-playbtn">
                <svg class="embed__svg embed__svg--circle">
                    <circle class="c1 js-embed-playbtn-circle" r="60px" cx="60px" cy="60px" />
                    <circle class="c2 js-embed-playbtn-circle" r="50px" cx="50px" cy="50px" />
                    <circle class="c3 js-embed-playbtn-circle" r="32px" cx="32px" cy="32px" />
                </svg>
                <div class="embed__playbtn__label p -fbold -caps -light">Play</div>
                <svg class="embed__svg embed__svg--polygon">
                    <polygon points="0 0 0 18 15 9 0 0"></polygon>
                </svg>
            </div>
        </div>
    `;
};
