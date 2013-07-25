
( function PromiseLibrary() {
    //"use strict";

    window.util = window.util || {};       //defining NameSpace
    window.util.Promise = Promise;

    // worker = function(success, failure){  
    // ---- call success() when done ----
    // ---- call failure() when failed ----
    // }
    //
    // ---- context is the context will found in every then ----
    function Promise( worker, context ) {
        var that = this;
        this._thens = [];

        function success( ) {
            var args = arguments;
            for (var i = 0; i < that._thens.length; i++) {
                args = [that._thens[i].success.apply( context, args )];
                that._thens.splice( i--, 1 );
            }
        }
        function failure( ) {
            var args = arguments;
            for ( var i = 0; i < that._thens.length; i++ ) {
                args = [that._thens[i].failure.apply( context, args )];
                that._thens.splice( i--, 1 );
            }
        }
        setTimeout( function () {
            worker.call( context, success, failure );
        }, 0 );
        this.resolve = success;
        this.reject = failure;
    }

    // **************--- Core Methods ---************** \\
    Promise.prototype.then = function ( success, failure ) {
        if ( success instanceof Function ) {
            if ( !(failure instanceof Function) ) {
                failure = function ( arg ) { return arg; };
            }
            this._thens.push( { success: success, failure: failure } );
        }
        return this;
    }
    // ************************************************* \\
    

    // **************--- helping Methods ---************** \\

    // *************************************************** \\


} )();

//( function testing() {
//    var b = new window.util.Promise( function ( success, failure ) {
//        setTimeout( function () {
//            success( "good1", "g" );
//        }, 100 );

//        setTimeout( function () {
//            failure( "bad1", "b" );
//        }, 100 );

//    } );

//    b.then( function ( str ) {
//        console.log( str );
//        return "good2";
//    },
//    function ( str ) {
//        console.log( str );
//        return "bad2";
//    } ).then( function ( str ) {
//        console.log( str );
//        return "good3";
//    },
//    function ( str ) {
//        console.log( str );
//        return "bad3";
//    } );
//    b.then( function ( str ) {
//        console.log( str );
//    },
//    function ( str ) {
//        console.log( str );
//    } );
//} )();
//var a = util.JSON.stringify(test1, null, '\t');