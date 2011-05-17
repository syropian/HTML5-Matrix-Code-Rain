var chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var colCount = 90; //number of falling code columns on screen
var colX = new Array(); //column's x coordinate
var colY = new Array(); //column's y coordinate
var speed = new Array(); //column's speed
var size = new Array(); //column's size
var length = 20; //number of chars per column
var colours = ['#cefbe4', '#81ec72', '#5cd646', '#54d13c', '#43c728']; //possible colours

var elem, context, timer; //canvas variables

//Let's make generating random numbers a little easier
function random(min, max)
{
	return Math.floor(Math.random() * max) + min;
}

//initialize some random values for our column's attributes
for (var i = 0; i <= colCount; i++)
{
	colX[i] = random(0,1280);
	colY[i] = -100;
	speed[i] = random(3,7);
	size[i] = random(12,24);
	
}

//set up a function to draw a single column
function drawCol(x,y)
{
	var aChar;
	
	for (var i = 0; i <= length; i++)
	{
		aChar = chars[random(0,chars.length)]; //ever changing letters!
	    
	    //colour different characters of the column
		if (context.fillText)
		{
			switch(i)
			{
				case 0:
				    context.fillStyle = colours[0];
				    break;
				case 1:
				    context.fillStyle = colours[1];
				    break;
				case 5:
				    context.fillStyle = colours[2];
			        break;
			    case 10:
			        context.fillStyle = colours[2];
				    break;
				case 15:
				    context.fillStyle = colours[2];
		     	    break;
				case 17:
				    context.fillStyle = colours[2];
		            break;
				    
			}
			context.fillText(aChar, x, y);
		}
		y -= size[i]; //stack 'em
	}
}

//Time to draw 'em all!
function draw()
{
	context.clearRect(0,0,elem.width, elem.height); //clear our canvas
	
	//Set our glow offsets to 0, blur and colour it 
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.shadowBlur = 8;
	context.shadowColor = '#94f475';
    context.textBaseline = 'top';
    context.textAlign = 'center';
    //Now lets craft some columns!
    for (var i = 0; i <= colCount; i++)
    {
	    context.font = size[i] + 'px MatrixCode';
	
	    if( colY[i] > elem.height + (size[i]*20) )
	    {
		    size[i] = random(12,24);
		    
		    colX[i] = random(0, elem.width);
		    colY[i] = -(size[i]*20);
		    speed[i] = random(3,7);
		
		    drawCol(colX[i], colY[i]); //draw a column
	    }
	    else
	    {
		    drawCol(colX[i], colY[i]);
	    }
	    
	    colY[i] += speed[i]; //move it!!
	    
    }
}

function init() {
    // get the canvas' id
    elem = document.getElementById('theMatrix');
    if (!elem || !elem.getContext) return;
    
    // get the canvas' context
    context = elem.getContext('2d');
    if (!context) return;
    
    timer = setInterval('draw()', 50);
}


