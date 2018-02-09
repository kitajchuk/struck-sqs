export default ( data ) => {
    const baseUrl = "https://medium.com/";
    const baseUrlBlog = `${baseUrl}greater-than/`;
    const baseUrlImages = "https://cdn-images-1.medium.com/fit/c/64/64/";
    const mediumSvgLogo = require( `../../../blocks/svg-medium-logo.block` );
    const getUser = ( userId ) => {
        return data.users.find(( user ) => {
            return (user.userId === userId);
        });
    };
    const getDate = ( timestamp ) => {
        const date = new Date( timestamp );
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return `${months[ date.getMonth() ]}${date.getDay()}`;
    };
    const getRead = ( time ) => {
        return `${Math.floor( time )} min read`;
    };

    return data.posts.slice( 0, 4 ).map(( post ) => {
        const postUser = getUser( post.creatorId );
        const postText = (post.previewContent.bodyModel.paragraphs[ 2 ] || post.previewContent.bodyModel.paragraphs[ 1 ] || post.previewContent.bodyModel.paragraphs[ 0 ]).text;

        return `<div class="posts__item -column -vtop anim anim--tr js-lazy-anim">
            <a class="posts__title h4 -fbold -northborder" href="${baseUrlBlog}${post.uniqueSlug}" target="_blank">${post.title}</a>
            <a class="posts__text p" href="${baseUrlBlog}${post.uniqueSlug}" target="_blank">${postText}</a>
            <a class="posts__meta" href="${baseUrl}@${postUser.username}" target="_blank">
                <div class="posts__mmeta -column">
                    <div class="posts__avatar -cover js-lazy-image" data-img-src="${baseUrlImages}${postUser.imageId}"></div>
                </div>
                <div class="posts__mmeta posts__author -column">
                    <div class="m m--static -fmedium">${postUser.name}</div>
                    <div class="m m--static -fmedium -grey">${postUser.bio}</div>
                    <div class="m m--static -fmedium -grey">
                        <div class="-column">${getDate( post.createdAt )}</div>
                        <span class="-column"></span>
                        <div class="-column">${getRead( post.virtuals.readingTime )}</div>
                    </div>
                </div>
                <div class="posts__mmeta posts__platform -column">${mediumSvgLogo}</div>
            </a>
        </div>`;

    }).join( "" );
};
