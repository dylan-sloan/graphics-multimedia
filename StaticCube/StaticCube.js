/*
 * Course: CS 4722
 * Section: 01
 * Name: Dylan Sloan
 * Professor: Alan Shaw
 * Assignment #: Module 2, Assignment 1, Exercise #1
 */

"use strict";

var canvas;
var gl;

var theta = vec3( 45, 45, 45 );
var thetaLoc;

var vertices = [
	vec3( -0.5,  0.5,  0.5 ), // 1
	vec3( -0.5, -0.5,  0.5 ), // 0
	vec3(  0.5, -0.5,  0.5 ), // 3
	
	vec3(  0.5, -0.5,  0.5 ), // 3
	vec3(  0.5,  0.5,  0.5 ), // 2
	vec3( -0.5,  0.5,  0.5 ), // 1
	
	vec3(  0.5,  0.5,  0.5 ),   // 2
	vec3(  0.5, -0.5,  0.5 ),   // 3
	vec3(  0.5, -0.5, -0.5 ),    // 7
	
	vec3(  0.5, -0.5, -0.5 ),    // 7
	vec3(  0.5,  0.5, -0.5 ),   // 6
	vec3(  0.5,  0.5,  0.5 ),   // 2
	
	vec3(  0.5, -0.5,  0.5 ), // 3
	vec3( -0.5, -0.5,  0.5 ), // 0
	vec3( -0.5, -0.5, -0.5 ), // 4
	
	vec3(-0.5, -0.5, -0.5), // 4
    vec3(0.5, -0.5, -0.5),  // 7
    vec3(0.5, -0.5, 0.5),   // 3

    vec3(0.5, 0.5, -0.5),   // 6       
    vec3(  0.5,  0.5,  0.5 ),   // 2
    vec3(-0.5, 0.5, 0.5),      // 1    

    vec3( -0.5,  0.5,  0.5 ),   // 1        
    vec3( -0.5,  0.5, -0.5 ),   // 5  
    vec3(  0.5,  0.5, -0.5 ),   // 6      


    vec3( -0.5, -0.5, -0.5 ),   // 4     
    vec3( -0.5,  0.5, -0.5 ),   // 5        
    vec3(  0.5,  0.5, -0.5 ),   // 6        


    vec3(0.5, 0.5, -0.5),          
    vec3(0.5, -0.5, -0.5),         
    vec3(-0.5, -0.5, -0.5),        

    vec3(-0.5, 0.5, -0.5),         
    vec3(-0.5, -0.5, -0.5),        
    vec3(-0.5, -0.5, 0.5),         

    vec3(-0.5, -0.5, 0.5),         
    vec3(-0.5, 0.5, 0.5),          
    vec3(-0.5, 0.5, -0.5),        

	
	/*vec3( -0.5, -0.5,  0.5 ), // 0
    vec3( -0.5,  0.5,  0.5 ),   // 1
    vec3(  0.5,  0.5,  0.5 ),   // 2
    vec3(  0.5, -0.5,  0.5 ),   // 3
    vec3( -0.5, -0.5, -0.5 ),   // 4
    vec3( -0.5,  0.5, -0.5 ),   // 5
    vec3(  0.5,  0.5, -0.5 ),   // 6
    vec3(  0.5, -0.5, -0.5 ),    // 7
	*/
];

var vertexColors = [
    vec4(1.0, 0.0, 0.0, 1.0),  // 1
    vec4(0.0, 0.0, 0.0, 1.0),  // 0
    vec4(0.0, 1.0, 0.0, 1.0),  // 3


    vec4(0.0, 1.0, 0.0, 1.0),  // 3
    vec4(1.0, 1.0, 0.0, 1.0),  // 2
    vec4(1.0, 0.0, 0.0, 1.0),  // 1


    vec4( 1.0, 1.0, 0.0, 1.0 ),  // 2 yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // 3 green
    vec4( 0.0, 1.0, 1.0, 1.0 ),   // 7 cyan

    vec4( 0.0, 1.0, 1.0, 1.0 ),   // 7 cyan
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // 6 white
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // 2 yellow

    vec4( 0.0, 1.0, 0.0, 1.0 ),  // 3 green
    vec4(0.0, 0.0, 0.0, 1.0),  // 0 black
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // 4 blue

    vec4( 0.0, 0.0, 1.0, 1.0 ),  // 4 blue
    vec4( 0.0, 1.0, 1.0, 1.0 ),   // 7 cyan
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // 3 green

    vec4( 1.0, 1.0, 1.0, 1.0 ),  // 6 white
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // 2 yellow
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // 1 red

    vec4( 1.0, 0.0, 0.0, 1.0 ),  // 1 red
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // 5 magenta
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // 6 white

    vec4( 0.0, 0.0, 1.0, 1.0 ),  // 4 blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // 5 magenta
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // 6 white

    vec4( 1.0, 1.0, 1.0, 1.0 ),  // 6 white
    vec4( 0.0, 1.0, 1.0, 1.0 ),   // 7 cyan
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // 4 blue

    vec4( 1.0, 0.0, 1.0, 1.0 ),  // 5 magenta
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // 4 blue
    vec4(0.0, 0.0, 0.0, 1.0),  // black 0

    vec4(0.0, 0.0, 0.0, 1.0),  // black 0
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // 1 red
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // 5 magenta
	
	/* 
	vec4( 0.0, 0.0, 0.0, 1.0 ),  // 0 black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // 1 red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // 2 yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // 3 green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // 4 blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // 5 magenta
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // 6 white
    vec4( 0.0, 1.0, 1.0, 1.0 ),   // 7 cyan
	*/
];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // vertex array attribute buffer code goes here
	
	var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // color array attribute buffer code goes here
	
	var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    // thetaLoc uniform variable code goes here
	
	var thetaLoc = gl.getUniformLocation(program, "theta");
	gl.uniform3fv(thetaLoc, theta);

    render();
}

function render()
{
    // render code goes here
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, vertices.length);
}