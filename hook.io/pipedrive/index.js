// A simple hello world microservice
// Service will respond to HTTP requests with a string
module["exports"] = function getPipedrive ( hook ) {
    const request = require( "request-promise" );

    // hook.params from Squarespace
    // // Name
    // "text-yui_3_17_2_1_1513626979285_41600": "String",
    // // Company
    // "text-yui_3_17_2_1_1513626979285_24222": "String",
    // // Email
    // "email-yui_3_17_2_1_1513626979285_25400": "String",
    // // Phone
    // "phone-yui_3_17_2_1_1513626979285_43483": [Array],
    // // Message
    // "textarea-yui_3_17_2_17_1513626979285_3714": "String",
    // // Inquiry
    // "select-yui_3_17_2_1_1523901252791_11879": "String"

  	// Functions
    const createPerson = () => {
        return request({
            url: `https://api.pipedrive.com/v1/persons`,
            method: "POST",
            qs: {
                api_token: hook.env.pipedrive_api_token
            },
            body: {
                name: hook.params[ "text-yui_3_17_2_1_1513626979285_41600" ],
                owner_id: hook.env.pipedrive_api_user,
                //org_id: null,
                email: hook.params[ "email-yui_3_17_2_1_1513626979285_25400" ],
                phone: hook.params[ "phone-yui_3_17_2_1_1513626979285_43483" ].join( "" ),
                //visible_to: null,
                //add_time: null
            },
            json: true
        });
    };

    const updatePerson = ( person, organization ) => {
        return request({
            url: `https://api.pipedrive.com/v1/persons/${person.id}`,
            method: "PUT",
            qs: {
                api_token: hook.env.pipedrive_api_token
            },
            body: {
                org_id: organization.id
            },
            json: true
        });
    };

    const createOrganization = () => {
        return request({
            url: `https://api.pipedrive.com/v1/organizations`,
            method: "POST",
            qs: {
                api_token: hook.env.pipedrive_api_token
            },
            body: {
                name: hook.params[ "text-yui_3_17_2_1_1513626979285_24222" ],
                owner_id: hook.env.pipedrive_api_user,
                //visible_to: null,
                //add_time: null
            },
            json: true
        });
    };

    const createDeal = ( person, organization ) => {
        return request({
            url: `https://api.pipedrive.com/v1/deals`,
            method: "POST",
            qs: {
                api_token: hook.env.pipedrive_api_token
            },
            body: {
                title: hook.params[ "select-yui_3_17_2_1_1523901252791_11879" ],
                //value: null,
                //currency: null,
                user_id: hook.env.pipedrive_api_user,
                person_id: person.id,
                org_id: organization ? organization.id : null,
                pipeline_id: 4,
                //stage_id: null,
                status: "open",
                //probability: null,
                //lost_reason: null,
                //visible_to: null,
                //add_time: null
            },
            json: true
        });
    };

    const createNote = ( deal, person, organization ) => {
        return request({
            url: `https://api.pipedrive.com/v1/notes`,
            method: "POST",
            qs: {
                api_token: hook.env.pipedrive_api_token
            },
            body: {
                content: hook.params[ "textarea-yui_3_17_2_17_1513626979285_3714" ],
                deal_id: deal.id,
                person_id: person.id,
                org_id: organization ? organization.id : null,
                //pinned_to_deal_flag: null,
                //pinned_to_organization_flag: null,
                //pinned_to_person_flag: null
            },
            json: true
        });
    };


    // Filter out unwanted requests
    // This is just an insurance policy,
    // the website does this on the client-side as well...
    if ( hook.params[ "select-yui_3_17_2_1_1523901252791_11879" ] !== "New Business" ) {
        hook.res.end( JSON.stringify({
            success: false,
            error: "Invalid business inquiry type, expected 'New Business' here..."
        }));
        return false;
    }


    // Pipedrive: Create Person
    createPerson().then(( json ) => {
        // json { success, data }
        const person = json.data;

        // Pipedrive: Create Organization?
        if ( hook.params[ "text-yui_3_17_2_1_1513626979285_24222" ] ) {
            createOrganization().then(( json ) => {
                // json { success, data }
                const organization = json.data;

                // Pipedrive: Update Person?
                updatePerson( person, organization ).then(() => {
                    // Pipedrive: Create Deal for `Leads` Pipeline with Person and Organization?
                    createDeal( person, organization ).then(( json ) => {
                        createNote( json.data, person, organization ).then(( json ) => {
                            hook.res.end( JSON.stringify({
                                success: true
                            }));
                        });
                    });
                });
            });

        } else {
            // Pipedrive: Create Deal for `Leads` Pipeline with Person and Organization?
            createDeal( person ).then(( json ) => {
                createNote( json.data, person ).then(( json ) => {
                    hook.res.end( JSON.stringify({
                        success: true
                    }));
                });
            });
        }
    });
};
