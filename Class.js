
( function Classes() {
    "use strict";

    window.util = window.util || {};       //defining NameSpace
    window.util.defineClass = defineClass;

    function defineClass( constructor, prototypes, instanceAttributes, staticMethods ) {
        instanceAttributes = instanceAttributes || {};
        prototypes = prototypes || {};
        staticMethods = staticMethods || {};

        constructor.parentClass = function () { };

        function Class() {
            constructor.parentClass.call( this, arguments );
            constructor.call( this, arguments );
            for ( var i in instanceAttributes ) {
                this[i] = instanceAttributes[i];
            }            
        };
        Class.prototype = Object.create( prototypes );
        constructor.prototype = Object.create( prototypes );
        Class.prototype.constructor = constructor;
        constructor.prototype.constructor = constructor;

        for ( var i in staticMethods ) {
            Class[i] = staticMethods[i];
        }

        Class.inherit = function ( parentClass ) {
            if ( typeof parentClass == "function" ) {
                constructor.parentClass = parentClass;
                var oldPrototypes = this.prototype;
                this.prototype = Object.create( parentClass.prototype );
                for ( var i in oldPrototypes ) {
                    this.prototype[i] = oldPrototypes[i];
                }
                this.prototype.parentConstructor = parentClass;
            }
        }

        return Class;
    }


    // **************--- Core Methods ---************** \\
    // ************************************************* \\
    

    // **************--- helping Methods ---************** \\
    // *************************************************** \\


} )();

//( function testing() {
//    window.class1 = util.defineClass( function () {
//        this.a = 10;
//    },
//    {
//        draw: function () {
//            return "draw";
//        }
//    },
//    {
//        x: 5
//    } );

//    window.class2 = util.defineClass( function () {
//        this.b = 7;
//    },
//    {
//        adjust: function () {
//            return "draw";
//        }
//    },
//    {
//        y: 5
//    } );

//    window.class2.inherit( class1 );
//} )();