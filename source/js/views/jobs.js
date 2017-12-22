export default ( jobs ) => {
    return jobs.map(( job ) => {
        return `
            <a class="jobs__post -block" href="/careers/?career=${job.id}">
                <div class="jobs_0 m -color -column -column--1of3 -vtop">${job.title}</div>
                <div class="jobs_1 m -column -column--1of3 -vtop">
                    <div class="-column -vtop">${job.location.name}</div>
                </div>
                <div class="jobs_2 m -column -column--1of3 -vtop">
                    <div class="-column -fregular -vtop">Lorem ipsum dolor sit amet, consectetur adipisicing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco</div>
                </div>
            </a>
        `;

    }).join( "" );
};
