// import * as core from "../core";



export default ( blockJson, imageJson ) => {
    const url = blockJson.url.replace( /\?.*?$/, "" );
    const qrs = "?&api=1&loop=0";
    const path = "https://player.vimeo.com/video/";
    const id = url.split( "/" ).pop();
    const source = `${path}${id}${qrs}`;
    const aspect = (blockJson.height || 9) / (blockJson.width || 16) * 100;
    const original = `${(blockJson.width || 16)}x${(blockJson.height || 9)}`;

    // ${!core.detect.isDevice() ? `
    //
    // ` : ""}

    return `
        <div class="embed js-embed">
            <div class="embed__aspect" style="padding-bottom:${aspect}%;">
                <iframe class="embed__element js-embed-iframe js-media-node" data-src="${source}" data-original="${original}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </div>

            <div class="embed__poster embed__overlay js-embed-poster js-lazy-image -cover -text--center" data-img-src="${imageJson.src}?format=${imageJson.imageResolution || 'original'}"></div>
            <div class="embed__poster embed__filter js-embed-poster js-lazy-image -cover" data-img-src="${imageJson.src}?format=${imageJson.imageResolution || 'original'}"></div>
            <div class="embed__playbtn js-embed-playbtn">
                <svg class="embed__svg embed__svg--circle"><circle class="js-embed-playbtn-circle" /></svg>
                <div class="embed__playbtn__label p -fbold -caps -light">Play</div>
                <svg class="embed__svg embed__svg--polygon"><polygon points="0 0 0 18 15 9 0 0"></polygon></svg>
            </div>
        </div>
    `;
};
