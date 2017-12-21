export default ( json ) => {
    return json.jobs.map(( job ) => {
        return `
            <a class="jobs__post -block" href="/careers/?job_id=${job.id}">
                <div class="m -color -column -column--1of3">${job.title}</div>
            </a>
        `;

    }).join( "" );
};
