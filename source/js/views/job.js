export default ( job ) => {
    const metaIDs = {
        struckIs: 160451,
        weNeed: 160452,
        youAre: 160453,
        youHave: 160454,
        youWill: 160455,
        eeoc: 160456
    };
    const getMeta = ( id ) => {
        const meta = job.metadata.find(( mmeta ) => {
            return (mmeta.id === id);
        });
        const metas = meta.value.split( /\n|\r/g );

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
    // const struckIs = getMeta( metaIDs.struckIs );
    const weNeed = getMeta( metaIDs.weNeed );
    const youAre = getMeta( metaIDs.youAre );
    const youHave = getMeta( metaIDs.youHave );
    const youWill = getMeta( metaIDs.youWill );
    // const eeoc = getMeta( metaIDs.eeoc );

    return `
        <div class="page__mast -wrap">
            <div class="mastline">
                <div class="h2 -column">${job.title}</div>
                <div class="mastline__line -column"></div>
                <div class="p -fbold -column">${job.location.name}</div>
            </div>
            <div class="-wrap -expt">
                <div class="m -caps -color">${weNeed.head}</div>
                <div class="h2">${weNeed.body.join( "" )}</div>
            </div>
        </div>
        <div class="page__cms -wrap -exp">
            <div class="-wrap">
                <div class="job__cols">
                    <div class="job__col -column -vtop">
                        <div class="p -fbold -northborder">${youAre.head}</div>
                        ${getList( youAre.body )}
                    </div>
                    <div class="job__col -column -vtop">
                        <div class="p -fbold -northborder">${youHave.head}</div>
                        ${getList( youHave.body )}
                    </div>
                    <div class="job__col -column -vtop">
                        <div class="p -fbold -northborder">${youWill.head}</div>
                        ${getList( youWill.body )}
                    </div>
                </div>
            </div>
        </div>
        <div class="page__cta module-linker -wrapl -expb">
            <div class="-wrapl">
                <div class="m -caps -color">Love. Fight. Adapt.</div>
                <a href="${job.absolute_url}/#application" class="h2" target="_blank">And apply now.</a>
            </div>
        </div>
    `;
};
