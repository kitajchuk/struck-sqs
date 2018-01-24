export default ( json, data ) => {
    json = json[ 0 ];

    let html = "";
    const item = json.items.find(( itm ) => {
        return (itm.urlId === data.urlId);
    });

    if ( item ) {
        html = `
            <a href="${item.fullUrl}" class="csbutton" target="_blank">
                <span class="csbutton__icon -column">
                    <span class="icon icon--plus">
                        <span class="ex1"></span>
                        <span class="ex2"></span>
                    </span>
                </span>
                <span class="csbutton__text -column">View full case study</span>
                <span class="csbutton__fill"></span>
            </a>
        `;
    }

    return html;
};
