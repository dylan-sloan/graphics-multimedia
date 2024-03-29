/*
 * Course: CS 4722
 * Section: 01
 * Name: Dylan Sloan
 * Professor: Alan Shaw
 * Assignment #: Module 2, Assignment 2, Exercise #1
 */
"use strict";

var canvas;
var gl;

var numVertices = 36;

var axis = 0;
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var theta = vec3( 0, 0, 0 );
var thetaLoc;

var vertices = [
	vec3( -0.5, -0.5,  0.5 ), // 0
    vec3( -0.5,  0.5,  0.5 ),   // 1
    vec3(  0.5,  0.5,  0.5 ),   // 2
    vec3(  0.5, -0.5,  0.5 ),   // 3
    vec3( -0.5, -0.5, -0.5 ),   // 4
    vec3( -0.5,  0.5, -0.5 ),   // 5
    vec3(  0.5,  0.5, -0.5 ),   // 6
    vec3(  0.5, -0.5, -0.5 ),    // 7
	
	vec3(-0.5, -0.5, 0.5),
    vec3(-0.5, 0.5, 0.5),
    vec3(0.5, 0.5, 0.5),
    vec3(0.5, -0.5, 0.5),
    vec3(-0.5, -0.5, -0.5),
    vec3(-0.5, 0.5, -0.5),
    vec3(0.5, 0.5, -0.5),
    vec3(0.5, -0.5, -0.5),
	
	vec3(-0.5, -0.5, 0.5),
    vec3(-0.5, 0.5, 0.5),
    vec3(0.5, 0.5, 0.5),
    vec3(0.5, -0.5, 0.5),
    vec3(-0.5, -0.5, -0.5),
    vec3(-0.5, 0.5, -0.5),
    vec3(0.5, 0.5, -0.5),
    vec3(0.5, -0.5, -0.5)
];

var vertexColors = [ 
	
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // 1 red
	vec4( 1.0, 0.0, 0.0, 1.0 ),  // 1 red
	vec4( 1.0, 0.0, 0.0, 1.0 ),  // 1 red
	vec4( 1.0, 0.0, 0.0, 1.0 ),  // 1 red
	
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // 2 yellow
	vec4( 1.0, 1.0, 0.0, 1.0 ),  // 2 yellow
	vec4( 1.0, 1.0, 0.0, 1.0 ),  // 2 yellow
	vec4( 1.0, 1.0, 0.0, 1.0 ),  // 2 yellow
	
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // 4 blue
	vec4( 0.0, 0.0, 1.0, 1.0 ),  // 4 blue
	vec4( 0.0, 1.0, 0.0, 1.0 ),  // 3 green
	vec4( 0.0, 1.0, 0.0, 1.0 ),  // 3 green
	
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // 4 blue
	vec4( 0.0, 0.0, 1.0, 1.0 ),  // 4 blue
	vec4( 0.0, 1.0, 0.0, 1.0 ),  // 3 green
	vec4( 0.0, 1.0, 0.0, 1.0 ),  // 3 green
	
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // 5 magenta
	vec4( 0.0, 1.0, 1.0, 1.0 ),   // 7 cyan
	vec4( 0.0, 1.0, 1.0, 1.0 ),   // 7 cyan
	vec4( 1.0, 0.0, 1.0, 1.0 ),  // 5 magenta
	
	vec4( 1.0, 0.0, 1.0, 1.0 ),  // 5 magenta
	vec4( 0.0, 1.0, 1.0, 1.0 ),   // 7 cyan
	vec4( 0.0, 1.0, 1.0, 1.0 ),   // 7 cyan
	vec4( 1.0, 0.0, 1.0, 1.0 ),  // 5 magenta
	
];

// indices of the 12 triangles that compise the cube

var indices = [
    1, 0, 3,
    3, 2, 1,
    10, 11, 15,
    15, 14, 10,
    19, 16, 20,
    20, 23, 19,
    22, 18, 17,
    17, 21, 22,
    4, 5, 6,
    6, 7, 4,
    13, 12, 8,
    8, 9, 13
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


    // array element buffer for vertex indices

    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);


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
	
	thetaLoc = gl.getUniformLocation(program, "theta");
	gl.uniform3fv(thetaLoc, theta);


    // button handlers code goes here
	
	document.getElementById("xButton").onclick =
      function () {
          axis = xAxis;
      };
	  
	document.getElementById("yButton").onclick =
      function () {
          axis = yAxis;
      };
	
	document.getElementById("zButton").onclick =
      function () {
          axis = zAxis;
      };


    render();
}

function render()
{
    // render code goes here
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	theta[axis] += 2.0;
	gl.uniform3fv(thetaLoc, theta);
	gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0);
	requestAnimFrame(render);
}
