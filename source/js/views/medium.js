export default ( data ) => {
    const baseUrl = "https://medium.com/greater-than/";
    const baseUrlImg = "https://cdn-images-1.medium.com/fit/c/64/64/";
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

        return `<div class="posts__item">
            <a class="posts__title h4 -fbold" href="${baseUrl}${post.uniqueSlug}" target="_blank">${post.title}</a>
            <div class="posts__text p">${postText}</div>
            <div class="posts__meta -bump3">
                <div class="posts__avatar -column -vtop -cover js-lazy-image" data-img-src="${baseUrlImg}${postUser.imageId}"></div>
                <div class="posts__author -column -vtop">
                    <div class="m -fmedium">${postUser.name}</div>
                    <div class="m -fmedium -grey">${postUser.bio}</div>
                    <div class="m -fmedium -grey">
                        <div class="-column">${getDate( post.createdAt )}</div>
                        <span class="-column"></span>
                        <div class="-column">${getRead( post.virtuals.readingTime )}</div>
                    </div>
                </div>
            </div>
        </div>`;
    });
};
