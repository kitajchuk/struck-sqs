// A simple hello world microservice
// Service will respond to HTTP requests with a string
module["exports"] = function helloWorld ( hook ) {
    // hook.req is a Node.js http.IncomingMessage
    // hook.res is a Node.js httpServer.ServerResponse
    var request = require( "request-promise" );
    var getArray = function ( elements ) {
        var ret = [];

        for ( var id in elements ) {
            ret.push( elements[ id ] );
        }

        return ret;
    };

    request({
        url: "https://medium.com/greater-than",
        method: "GET",
        headers: {
            "Accept": "application/json"
        }

    }).then(function ( data ) {
        data = data.replace( /^\]\)\}while\(1\);\<\/x\>/, "" );
        data = JSON.parse( data );
        data = JSON.stringify({
            users: getArray( data.payload.references.User ),
            posts: getArray( data.payload.references.Post )
        });

        hook.res.end( data );
    });
};
