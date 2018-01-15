export default ( json, data ) => {
    let html = "";
    const item = json.items.find(( itm ) => {
        return (itm.urlId === data.urlId);
    });

    if ( item ) {
        html = `<a href="${item.fullUrl}" class="csbutton btn btn--dark" target="_blank">+ <span>View full case study</span></a>`;
    }

    return html;
};
