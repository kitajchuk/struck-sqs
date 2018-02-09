export default ( jobs ) => {
    const metaIDs = {
        description: 49768
    };
    const getMeta = ( job, id ) => {
        return job.metadata.find(( meta ) => {
            return (meta.id === id);
        });
    };

    return jobs.map(( job ) => {
        const description = getMeta( job, metaIDs.description );

        return `
            <a class="nums jobs__post -block anim anim--op js-lazy-anim" href="/careers/?career=${job.id}">
                <div class="nums__item nums__item--3up m -color -column -vtop">${job.title}</div>
                <div class="nums__item nums__item--3up nums__item--lab m -column -vtop" data-num="1.">
                    <div class="-column">${job.location.name}</div>
                </div>
                <div class="nums__item nums__item--3up nums__item--lab m -column -vtop" data-num="2.">
                    <div class="-column -fregular">${description.value}</div>
                </div>
            </a>
        `;

    }).join( "" );
};
