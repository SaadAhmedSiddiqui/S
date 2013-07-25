
( function NamespaceDefiner() {
    "use strict";

    window.util = window.util || {};       //defining NameSpace
    window.util.namespace = namespace;

    // name contains the label of namespace, seperated by dot for attributing, e.g: computer.keyboard.button
    // object contains attributes to define inside namespace
    function namespace( name, object ) {
        if ( !/[\w$_]*(\..+[^\.]$)?/.test( name ) ) throw new Error( "UnExpected Naming", "UnExpected Naming" );

        var attrs = name.split( "." );
        if ( attrs[attrs.length - 1] == "" ) throw new Error( "Incomplete Naming", "Incomplete Naming" );

        var currentObject = window[attrs[0]] = window[attrs[0]] || {};
        attrs.shift();
        attrs.forEach( function ( attr ) {
            try{
                currentObject[attr] = currentObject[attr] || {};
            }
            catch ( e ) {
                throw new Error( "Namespace Allready aquired by a non-object", "Namespace Allready aquired by non-object" );
            }
            currentObject = currentObject[attr];
        } );
        for ( var i in object ) {
            try {
                currentObject[i] = object[i];
            }
            catch ( e ) {
                throw new Error( "Namespace Allready aquired by a non-object", "Namespace Allready aquired by non-object" );
            }
        }
    }

    // **************--- Core Methods ---************** \\
    // ************************************************* \\
    

    // **************--- helping Methods ---************** \\
    // *************************************************** \\


} )();

//( function testing() {
//    window.computer = { keyboard: 4 };
//    util.namespace( "computer.keyboard.button", { s: 5 } );
//    util.namespace( "computer.keyboard.button", { d: 6 } );
//} )();