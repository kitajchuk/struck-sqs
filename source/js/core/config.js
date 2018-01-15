import Easing from "properjs-easing";


/**
 *
 * @public
 * @namespace config
 * @memberof core
 * @description Stores app-wide config values.
 *
 */
const config = {
    /**
     *
     * @public
     * @member homepage
     * @memberof core.config
     * @description The default homepage slug.
     *
     */
    homepage: "home",


    /**
     *
     * @public
     * @member defaultEasing
     * @memberof core.config
     * @description The default easing function for javascript Tweens.
     *
     */
    defaultEasing: Easing.easeInOutCubic,


    /**
     *
     * @public
     * @member defaultDuration
     * @memberof core.config
     * @description The default duration for javascript Tweens.
     *
     */
    defaultDuration: 400,


    /**
     *
     * @public
     * @member defaultVideoChannel
     * @memberof core.config
     * @description The [MediaBox]{@link https://github.com/ProperJS/MediaBox} channel used for video.
     *
     */
    defaultVideoChannel: "vid",


    /**
     *
     * @public
     * @member defaultAudioChannel
     * @memberof core.config
     * @description The [MediaBox]{@link https://github.com/ProperJS/MediaBox} channel used for audio.
     *
     */
    defaultAudioChannel: "bgm",


    /**
     *
     * @public
     * @member pageSelector
     * @memberof core.config
     * @description The string selector used for <page> node.
     *
     */
    pageSelector: ".js-page",


    /**
     *
     * @public
     * @member introSelector
     * @memberof core.config
     * @description The string selector used for <intro> node.
     *
     */
    introSelector: ".js-intro",


    /**
     *
     * @public
     * @member naviSelector
     * @memberof core.config
     * @description The string selector used for <navi> node.
     *
     */
    naviSelector: ".js-navi",


    /**
     *
     * @public
     * @member lazyImageSelector
     * @memberof core.config
     * @description The string selector used for images deemed lazy-loadable.
     *
     */
    lazyImageSelector: ".js-lazy-image",


    /**
     *
     * @public
     * @member contactSelector
     * @memberof core.config
     * @description The string selector used for <contact>.
     *
     */
    contactSelector: ".js-contact",


    /**
     *
     * @public
     * @member socialSelector
     * @memberof core.config
     * @description The string selector used for <social>.
     *
     */
    socialSelector: ".js-social",


    /**
     *
     * @public
     * @member jobsboardSelector
     * @memberof core.config
     * @description The string selector used for <jobsboard>.
     *
     */
    jobsboardSelector: ".js-jobsboard",


    /**
     *
     * @public
     * @member viewSelector
     * @memberof core.config
     * @description The string selector used for <view>.
     *
     */
    viewSelector: ".js-view",


    /**
     *
     * @public
     * @member dragSelector
     * @memberof core.config
     * @description The string selector used for <drag>.
     *
     */
    dragSelector: ".js-drag",


    /**
     *
     * @public
     * @member coverSelector
     * @memberof core.config
     * @description The string selector used for <cover>.
     *
     */
    coverSelector: ".js-cover",


    /**
     *
     * @public
     * @member aspectSelector
     * @memberof core.config
     * @description The string selector used for <aspect>.
     *
     */
    aspectSelector: ".js-aspect",


    /**
     *
     * @public
     * @member togglesSelector
     * @memberof core.config
     * @description The string selector used for <toggles>.
     *
     */
    togglesSelector: ".js-toggles",


    /**
     *
     * @public
     * @member lazyImageAttr
     * @memberof core.config
     * @description The string attribute for lazy image source URLs.
     *
     */
    lazyImageAttr: "data-img-src",


    /**
     *
     * @public
     * @member imageLoaderAttr
     * @memberof core.config
     * @description The string attribute ImageLoader gives loaded images.
     *
     */
    imageLoaderAttr: "data-imageloader"
};



/******************************************************************************
 * Export
*******************************************************************************/
export default config;
