
( function NamespaceDefiner() {
    "use strict";

    window.util = window.util || {};       //defining NameSpace
    window.util.namespace = namespace;
    window.util.Accessor = Accessor;

    // name contains the label of namespace, seperated by dot for attributing, e.g: computer.keyboard.button
    // object contains attributes to define inside namespace
    function namespace( name, object ) {
        //if ( !/[\w$_]*(\..+[^\.]$)?/.test( name ) ) throw new Error( "UnExpected Naming", "UnExpected Naming" );

        var attrs = name.split( "." );
        if ( attrs[attrs.length - 1] == "" ) throw new Error( "Incomplete Naming on " + name, "Incomplete Naming on " + name );

        var currentObject = window[attrs[0]] = window[attrs[0]] || {};
        attrs.shift();
        attrs.forEach( function ( attr ) {
            try {
                currentObject[attr] = currentObject[attr] || {};
            }
            catch ( e ) {
                console.log( "cannot create " + attr + " from " + name );
                throw new Error( "Namespace Allready aquired by a non-object", "Namespace Allready aquired by non-object" );
            }
            currentObject = currentObject[attr];
        } );
        for ( var i in object ) {
            try {
                if ( typeof object[i] == "object" && object[i] instanceof Accessor ) {
                    Object.defineProperty( currentObject, i, object[i]._accessorProperty );
                } else {
                    currentObject[i] = object[i];
                }                
            }
            catch ( e ) {
                console.log( "cannot create " + attr + " from " + name );
                throw new Error( "Namespace Allready aquired by a non-object", "Namespace Allready aquired by non-object" );
            }
        }
    }

    function Accessor(getter, setter) {
        this._accessorProperty = { get: getter };
        if ( setter instanceof Function ) {
            this._accessorProperty.set = setter;
        }
    }
    // **************--- Core Methods ---************** \\
    // ************************************************* \\
    

    // **************--- helping Methods ---************** \\
    // *************************************************** \\


} )();

( function testing() {

    util.namespace( "svgEditor.constants", {
        menuRadius: new util.Accessor( function () {
            return 10;
        } )
    } );

    util.namespace( "svgEditor", {
        menu: new util.Accessor( function () {
            return 20;
        } )
    } );

    //    var a = 6;
    //    window.computer = { keyboard: { m: 4 } };
    //    util.namespace( "computer.keyboard.button", {
    //        s: 5,
    //        g: new util.Accessor( function () {
    //            return a;
    //        },
    //        function ( val ) {
    //            a = val;
    //        } )
    //    } );
    //    util.namespace( "computer.keyboard.button", { d: 6 } );
} )();