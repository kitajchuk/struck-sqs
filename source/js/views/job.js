export default ( job ) => {
    const jobDescId = 49768;
    const findMeta = ( id ) => {
        return job.metadata.find(( meta ) => {
            return (meta.id === id);
        });
    };

    return `
        <div class="page__mast -wrap">
            <div class="h2">${job.title}</div>
            <div class="-wrap -exp">
                <div class="m -caps -color">We Need&hellip;</div>
                <div class="h2">${findMeta( jobDescId ).value}</div>
            </div>
        </div>
        <div class="page__content -wrap">
            <div class="m -wrap -fpo">[FPO: Greenhouse content will go here&hellip;]</div>
        </div>
        <div class="page__cta module-linker -wrapl -exp">
            <div class="-wrapl">
                <div class="m -caps -color">Love. Fight. Adapt.</div>
                <a href="${job.absolute_url}" class="h2" target="_blank">And apply now.</a>
            </div>
        </div>
    `;
};
