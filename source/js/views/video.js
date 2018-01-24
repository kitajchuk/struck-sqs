import * as core from "../core";



export default ( blockJson, contentJson ) => {
    const url = blockJson.url.replace( /\?.*?$/, "" );
    const qrs = "?&api=1&loop=0";
    const path = "https://player.vimeo.com/video/";
    const id = url.split( "/" ).pop();
    const source = `${path}${id}${qrs}`;
    const aspect = (blockJson.height || 9) / (blockJson.width || 16) * 100;

    return `
        <div class="embed js-embed">
            <div class="embed__aspect" style="padding-bottom:${aspect}%;">
                <iframe class="embed__element js-embed-iframe" data-src="${source}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </div>
            ${!core.detect.isDevice() ? `<div class="embed__poster embed__overlay js-embed-poster js-lazy-image -cover -text--center" data-img-src="${contentJson.assetUrl}" data-variants="${contentJson.systemDataVariants}">
                <div class="embed__poster embed__filter js-embed-poster js-lazy-image -cover" data-img-src="${contentJson.assetUrl}" data-variants="${contentJson.systemDataVariants}"></div>
                <div class="embed__playbtn js-embed-playbtn">
                    <div class="embed__playbtn__label p -fbold -caps -light">Play</div>
                </div>
            </div>` : ""}
        </div>
    `;
};
