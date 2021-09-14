/*
 * Course: CS 4722
 * Section: 01
 * Name: Dylan Sloan
 * Professor: Alan Shaw
 * Assignment #: Module 1, Assignment 1, Exercise #2
 */

"use strict";

var canvas;
var gl;

var points = [];

var numTimesToSubdivide = 0;

var bufferId;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
        
    //
    //  Initialize our data for the Sierpinski Gasket
    //    

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
    
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, 8*Math.pow(3, 6), gl.STATIC_DRAW );



    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

	
	var colorLoc = gl.getUniformLocation(program, "color");
	gl.uniform4fv(colorLoc, [ 1, 0, 0, 1 ]);

    
    document.getElementById("sliderval").oninput =
      function(event) {
        numTimesToSubdivide = Number(document.getElementById('sliderval').value);
		if (numTimesToSubdivide == 0) {
			gl.uniform4fv(colorLoc, [ 1, 0, 0, 1 ]);
		}
		else if (numTimesToSubdivide == 1) {
			gl.uniform4fv(colorLoc, [ 0, 1, 0, 1 ]);
		}
		else if (numTimesToSubdivide == 2) {
			gl.uniform4fv(colorLoc, [ 0, 0, 1, 1 ]);
		}
		else if (numTimesToSubdivide == 3) {
			gl.uniform4fv(colorLoc, [ 1, 1, 0, 1 ]);
		}
		else if (numTimesToSubdivide == 4) {
			gl.uniform4fv(colorLoc, [ 0, 1, 1, 1 ]);
		}
		else if (numTimesToSubdivide == 5) {
			gl.uniform4fv(colorLoc, [ 1, 0, 1, 1 ]);
		}
        render();
      };


    render();
};


function triangle( a, b, c )
{
    points.push( a, b, c );
}

function divideTriangle( a, b, c, count )
{

    // check for end of recursion
    
    if ( count == 0 ) {
        triangle( a, b, c );
    }
    else {
    
        //bisect the sides
        
        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var bc = mix( b, c, 0.5 );

        --count;

        // three new triangles
        divideTriangle( a, ab, ac, count );
        divideTriangle( c, ac, bc, count );
        divideTriangle( b, bc, ab, count );
    }
}


function render()
{
    var vertices = [
        vec2( -1, -1 ),
        vec2(  0,  1 ),
        vec2(  1, -1 )
    ];
    points = [];
    divideTriangle( vertices[0], vertices[1], vertices[2],
                    numTimesToSubdivide);

    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
    points = [];
}
