export default ( job ) => {
    const metaIDs = {
        weNeed: 160451,
        column1: 160453,
        column2: 160454,
        column3: 160455,
    };
    const getMeta = ( id ) => {
        const meta = job.metadata.find(( mmeta ) => {
            return (mmeta.id === id);
        });
        const metas = meta && meta.value ? meta.value.split( /\n|\r/g ) : ["", ""];

        return {
            head: metas[ 0 ],
            body: metas.slice( 1, metas.length )
        };
    };
    const getList = ( body ) => {
        return `<ul class="ul -bump2">
            ${body.map(( item ) => {
                return `<li class="li -bump">${item}</li>`;

            }).join( "" )}
        </ul>`;
    };
    const weNeed = getMeta( metaIDs.weNeed );
    const columns = [
        getMeta( metaIDs.column1 ),
        getMeta( metaIDs.column2 ),
        getMeta( metaIDs.column3 )
    ];

    return `
        <div class="page__mast -wrap anim anim--tr js-lazy-anim">
            <div class="mastline">
                <div class="h2 -column">${job.title}</div>
                <div class="mastline__line -column"></div>
                <div class="p -fbold -column">${job.location.name}</div>
            </div>
            <div class="-wrap -expt">
                <div class="m m--bump -caps -color anim anim--tr js-lazy-anim">${weNeed.head}</div>
                <div class="h2 anim anim--tr js-lazy-anim">${weNeed.body.join( "" )}</div>
            </div>
        </div>
        <div class="page__cms -wrap -exp">
            <div class="-wrap">
                <div class="job__cols">
                    ${columns.map(( column ) => {
                        return column.head && column.body[ 0 ] ? `
                            <div class="job__col -column -vtop anim anim--tr js-lazy-anim">
                                <div class="p -fbold -northborder">${column.head}</div>
                                ${getList( column.body )}
                            </div>
                        ` : "";

                    }).join( "" )}
                </div>
            </div>
        </div>
        <div class="page__cta module-linker -wrapl -expb">
            <div class="-wrapl">
                <div class="m m--bump -caps -color anim anim--tr js-lazy-anim">Love. Fight. Adapt.</div>
                <a href="${job.absolute_url}/#application" class="h2 anim anim--tr js-lazy-anim js-gtm-event" data-ec="site interaction" data-ea="careers" data-el="${job.title}: And apply now." target="_blank">And apply now.</a>
            </div>
        </div>
    `;
};
