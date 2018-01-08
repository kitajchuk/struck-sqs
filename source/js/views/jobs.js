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
            <a class="jobs__post -block" href="/careers/?career=${job.id}">
                <div class="jobs_0 m -color -column -column--1of3 -vtop">${job.title}</div>
                <div class="jobs_1 m -column -column--1of3 -vtop">
                    <div class="-column -vtop">${job.location.name}</div>
                </div>
                <div class="jobs_2 m -column -column--1of3 -vtop">
                    <div class="-column -fregular -vtop">${description.value}</div>
                </div>
            </a>
        `;

    }).join( "" );
};
