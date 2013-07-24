
( function JSONCircularParser() {
    "use strict";

    window.util = window.util || {};       //defining NameSpace
    window.util.JSON = new JSONCP();

    function JSONCP() {

    }

    JSONCP.prototype.stringify = function ( clonedObject ) {
        try{
            return JSON.stringify.apply( null, arguments );
        }
        catch ( e ) {

            traverseAndMark( clonedObject );
            return JSON.stringify.apply( null, arguments );
        }
    }

    JSONCP.prototype.parse = function ( str ) {
        return traverseAndUnMark( JSON.parse( str ) );
    }


    // **************--- helping Methods ---************** \\

    function traverseAndMark( root ) {
        var marks = {};
        marks["#root#"] = root;
        reoccur( root, "root" );

        function reoccur( current, currentAddress ) {
            for ( var i in current ) {
                if ( current[i] instanceof Object ) {
                    var matched = matchIn( current[i], marks );
                    if ( matched ) {
                        current[i] = matched;//currentAddress + "-" + i;
                    }
                    else {
                        marks["#" + currentAddress + "-" + i + "#"] = current[i];
                    }
                    reoccur( current[i], currentAddress + "-" + i );
                }
            }
        }

        return marks;
    }

    function traverseAndUnMark( root ) {
        reoccur( root );

        function reoccur( current ) {
            for ( var i in current ) {
                if ( current[i] instanceof Object ) {
                    reoccur( current[i] );
                } else if ( typeof current[i] == "string" && current[i][0] == "#" && current[i][current[i].length - 1] == "#" ) {
                    var addresses = current[i].replace( /\#/g, "" ).split("-").slice(1);
                    current[i] = root;
                    addresses.forEach( function ( addr ) {
                        current[i] = current[i][addr];
                    } );
                }
            }
        }
        return root;
    }

    function matchIn( target, patterens ) {

        for ( var i in patterens ) {
            if ( target == patterens[i] ) {
                return i;
            }
        }
        return false;
    }
    // *************************************************** \\


    /*( function testing() {
        window.test1 = {}
        //var test1 = {};
        var a = { b: [test1], d: test1, g: [5, 2] };
        a.b.push( a.b );
        test1.c = a;
    } )();*/
} )();

//var a = util.JSON.stringify(test1, null, '\t');