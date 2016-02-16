window.wordOfBabale = [];

function Panel(vertices,c)
{
    /*
var vertices = [
    1.0,  1.0,  0.0,
	-1.0, 1.0,  0.0,
    1.0,  -1.0, 0.0,
	-1.0, -1.0, 0.0
];*/
    

    gl.useProgram(window.shaderProgram);
    
    this._vertexPositionAttribute = gl.getAttribLocation(window.shaderProgram,
							 "aVertexPosition");
    
    gl.enableVertexAttribArray(this._vertexPositionAttribute);
    
    this._vertexColorAttribute = gl.getAttribLocation(window.shaderProgram,
						      "aVertexColor");
    
    gl.enableVertexAttribArray(this._vertexColorAttribute);


    this._squareVerticesBuffer = gl.createBuffer();    
    gl.bindBuffer(gl.ARRAY_BUFFER,
		  this._squareVerticesBuffer);
    
    gl.bufferData(gl.ARRAY_BUFFER,
		  new Float32Array(vertices),
		  gl.STATIC_DRAW);
    
    var colors = [
	c[0],  c[1], c[2] ,  1.0,    // blanc
	c[0],  c[1], c[2] ,  1.0,    // blanc
	c[0],  c[1], c[2] ,  1.0,    // blanc
	c[0],  c[1], c[2] ,  1.0,    // blanc
    ];
    
    this._squareVerticesColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,
		  this._squareVerticesColorBuffer);
    
    gl.bufferData(gl.ARRAY_BUFFER,
		  new Float32Array(colors),
		  gl.STATIC_DRAW);
    

    this.draw = function()
    {
	
        
	gl.bindBuffer(gl.ARRAY_BUFFER,
		      this._squareVerticesBuffer);
	
	gl.vertexAttribPointer(this._vertexPositionAttribute,
			       3,
			       gl.FLOAT,
			       false,
			       0,
			       0);    
	
	gl.bindBuffer(gl.ARRAY_BUFFER,
		      this._squareVerticesColorBuffer);
	
	gl.vertexAttribPointer(this._vertexColorAttribute,
			       4,
			       gl.FLOAT,
			       false,
			       0,
			       0);
	
	setMatrixUniforms();
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

	
    };

    
    this.move = function(delta)
    {}

    window.wordOfBabale.push(this);
}

function Babale(x, y,z, dx, dy,dz, color)
{
    this._x = x;
    this._y = y;
    this._z = z;
    this._angle = 0;
    
    this._dx = dx;
    this._dy = dy;
    this._dz = dz;
    
    //OpengLattrip  

    gl.useProgram(window.shaderProgram);
    
    this._vertexPositionAttribute = gl.getAttribLocation(window.shaderProgram,
							 "aVertexPosition");
    
    gl.enableVertexAttribArray(this._vertexPositionAttribute);
    
    this._vertexColorAttribute = gl.getAttribLocation(window.shaderProgram,
						      "aVertexColor");
    
    gl.enableVertexAttribArray(this._vertexColorAttribute);
    

    var vertices = [
	// Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
        // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,
        // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,
        // Bottom face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,
        // Right face
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,
        // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
	    -1.0,  1.0, -1.0
    ];
    
    this._squareVerticesBuffer = gl.createBuffer();    
    gl.bindBuffer(gl.ARRAY_BUFFER,
		  this._squareVerticesBuffer);
    
    gl.bufferData(gl.ARRAY_BUFFER,
		  new Float32Array(vertices),
		  gl.STATIC_DRAW);
    
    var r = Math.random; 

    var colors = [
	[r(),  r(),  r(),  0.5],    // f1
	[r(),  r(),  r(),  0.5],    // f1
	[r(),  r(),  r(),  0.5],    // f1
	[r(),  r(),  r(),  0.5],    // f1
	[r(),  r(),  r(),  0.5],    // f1
	[r(),  r(),  r(),  0.5],    // f1
    ];
  

    var generatedColors = [];
  
    for (j=0; j<6; j++) {
	var c = colors[j];
	
	for (var i=0; i<4; i++) {
	    generatedColors = generatedColors.concat(c);
	}
    }
    
    this._squareVerticesColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,
		  this._squareVerticesColorBuffer);
    
    gl.bufferData(gl.ARRAY_BUFFER,
		  new Float32Array(generatedColors),
		  gl.STATIC_DRAW);


    
    cubeVerticesIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
  
  
    var cubeVertexIndices = [
	0,  1,  2,      0,  2,  3,    // front
	4,  5,  6,      4,  6,  7,    // back
	8,  9,  10,     8,  10, 11,   // top
	12, 13, 14,     12, 14, 15,   // bottom
	16, 17, 18,     16, 18, 19,   // right
	20, 21, 22,     20, 22, 23    // left
    ];
  
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
		  new Uint16Array(cubeVertexIndices),
		  gl.STATIC_DRAW);
    
    this.draw = function()
    {
	mvTranslate([this._x, this._y, this._z]);
        mvRotate(this._angle,[1,1,1])

	gl.bindBuffer(gl.ARRAY_BUFFER,
		      this._squareVerticesBuffer);
	
	gl.vertexAttribPointer(this._vertexPositionAttribute,
			       3,
			       gl.FLOAT,
			       false,
			       0,
			       0);    
	
	gl.bindBuffer(gl.ARRAY_BUFFER,
		      this._squareVerticesColorBuffer);
	
	gl.vertexAttribPointer(this._vertexColorAttribute,
			       4,
			       gl.FLOAT,
			       false,
			       0,
			       0);
	


	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
	setMatrixUniforms();
	gl.drawElements(gl.TRIANGLES,36, gl.UNSIGNED_SHORT, 0);
	mvRotate(-this._angle,[1,1,1]);
	mvTranslate([-this._x, -this._y, -this._z]);
	/////new
	

	
    };

    
    this.move = function(delta)
    {
//	console.log(this._x);
	this._x += this._dx * ((100 * delta) / 1000.0);
	this._y += this._dy * ((100 * delta) / 1000.0);
	this._z += this._dz * ((100 * delta) / 1000.0);
	this._angle += (30 * delta) /1000
	//limite X | Y calcul
	limite =- this._z /3;

	if (this._x > limite) {

	    this._dx = -Math.abs(this._dx);

	}else if( this._x < -limite)
	{

	    this._dx =  Math.abs(this._dx);

	}

	if (this._y > limite)
	{
	    this._dy = -Math.abs(this._dy);
	}else if( this._y < -limite)
	{
	    this._dy = Math.abs(this._dy);
	}


	if (this._z > -20.0)
	{
	    this._dz = -Math.abs(this._dz);
	    
	}else if( this._z < -60.0)
	{
	    this._dz = Math.abs(this._dx);
	}


    };

    
    window.wordOfBabale.push(this);
    return this;
}

window.canvaToDraw = null;
function initWebGL(canvas) { 
  // Initialise la variable gloable gl à null
  gl = null; 

  try { 
    // Essaye de récupérer le contexte standard. En cas d'échec, il teste l'appel experimental
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl"); 
  } 
    catch(e)
    {
	console.log(e);
    } 

   // Si le contexte GL n'est pas récupéré, on l'indique à l'utilisateur.
    if (!gl) { 
      alert("Impossible d'initialiser le WebGL. Il est possible que votre navigateur ne supporte pas cette fonctionnalité."); 
  } 
}  

document.onload = load;

function load()
{
    window.pause = false;
    
    window.canvaToDraw = document.getElementById("canvaOpenGl");
    var min = Math.min(window.innerWidth-4,window.innerHeight-4);
    
    window.canvaToDraw.width = min;
    window.canvaToDraw.height = min;
    
    // this is dangerous if the function take more than the time needed
    initWebGL(window.canvaToDraw);
    if (gl) {
	gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // Met la couleur d'effacement au noir et complétement opaque
	gl.enable(gl.DEPTH_TEST);                               // Active le test de profondeur
	gl.depthFunc(gl.LEQUAL);                                // Les objets proches cachent les objets lointains
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // Efface les couleurs et le buffer de profondeur.
	initShaders();
	initBuffers();
	drawScene();
    }

    new Panel([
	20.0,20.0,-60.0,
	20.0,-20.0,-60.0,
	-20.0,20.0,-60.0,
	-20.0,-20.0,-60.0
    ],[1,0,0]);

    new Panel([
	20.0,20.0,-60.0,
	20.0,-20.0,-60.0,
	20.0,20.0,-20.0,
	20.0,-20.0,-20.0
    ],[0,1,0]);

    
    new Panel([
	20.0,20.0,-60.0,
	    -20.0,20.0,-60.0,
	 
	20.0,20.0,-20.0,
	    -20.0,20.0,-20.0
    ],[0,0,1]);
    
    
    new Panel([
	    -20.0,-20.0,-60.0,
	    -20.0,20.0,-60.0,
	    -20.0,-20.0,-20.0,
	    -20.0,20.0,-20.0
    ],[0,1,1]);
    
    new Panel([
	    -20.0,-20.0,-60.0,
	20.0,-20.0,-60.0,
	    -20.0,-20.0,-20.0,
	20.0,-20.0,-20.0
    ],[1,1,0]);

    // only 5
    for(var a = 0; a<5; a++)
	addBallToWord();

    setInterval(drawScene,1000/60);
    
}

function actionMulti(event)
{
    if (event.keyCode  ==  32)
	addBallToWord();
    else
	window.pause = !window.pause;

}

function addBallToWord()
{
    var z = (-random(30)) - 25;
    new Babale(
	random(-z/3*2)+z/3,
	random(-z/3*2)+z/3,
	z,
	(Math.random()-0.5) /3,
	(Math.random()-0.5) /3,
	(Math.random()-0.5) /3
	);
}



function random(num)
{
    return (Math.random() * num); 
}

