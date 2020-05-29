function make2DArray(cols, rows) {
	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
	  arr[i] = new Array(rows);
	}
	return arr;
  }
  
  
  let grid;
  let cols;
  let rows;
  let res = 20;
  let fr = 14
  let value = 0
  let isRunning = 0
  let play = false 

  
  function setup() {
	
	createCanvas(500, 500);
	cols = width / res;
	rows = height / res;

	space = min(width,height) / max(rows, cols);
	xoffset = width/2 - space * cols * 0.5;
  
	grid = make2DArray(cols, rows);

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
		  grid[i][j] = 0
		}
	  }


	  startButton = createButton("Start")
	  startButton.mousePressed(start)
	
	  endButton = createButton("Stop")
	  endButton.mousePressed(stop)

	  singleFrameButton = createButton("Single Frame")
	  singleFrameButton.mousePressed(singleFrame)
	
	  randomButton = createButton("Random")
	  randomButton.mousePressed(randomGrid)

	  resetButton = createButton("Clear")
	  resetButton.mousePressed(clearGrid)

	  increaseFRButton = createButton("Increase FR")
	  increaseFRButton.mousePressed(increaseFR)
	 
	  decreaseFRButton = createButton("Decrease FR")
	  decreaseFRButton.mousePressed(decreaseFR)

	  resetButton = createButton("Reset")
	  resetButton.mousePressed(reset)

	
	noLoop()
  }



  function mousePressed(){
	if(!isRunning){
		selectX = Math.floor((mouseX-xoffset) / space);
	selectY = Math.floor(mouseY / space);
	if(grid[selectX][selectY] == 1){
	  grid[selectX][selectY] = 0;
	  redraw()
	 
	} else {
	  grid[selectX][selectY] = 1;
	  redraw()
	 
	}
	console.log(`x: ${selectX}\ny: ${selectY}`);

	}
	
  }

 

 function increaseFR(){
	fr++;
 }
 function decreaseFR(){
 	fr--;
}
 



  function randomGrid(){

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
		  grid[i][j] = 0
		}
	  }
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
		  grid[i][j] = Math.round((Math.random()));
		}
	  }
	noLoop()

	redraw()
  }

  function clearGrid(){
		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
		  		grid[i][j] = 0
		}
	  }
	loop()
	// noLoop()
  }



  


  function start(){
	isRunning = 1;
	frameRate(fr);
	loop()
  }

  function stop(){
    noLoop()
  }

  function singleFrame(){
	redraw()
  }

  function reset(){
	 location.reload() 
  }



function draw() {
	frameRate(fr)
	background(0);
	text(frameCount, width/2, height);
	if(isRunning == 0){
	  for (let i = 0; i < cols; i++){
		for (let j = 0; j < rows; j++){
		  let x = i * res;
		  let y = j * res;
		  stroke(0); //grid color
		  fill(0);       //grid fill (dead)
		  rect(x, y, res - 1 , res - 1);
		  if(grid[i][j] == 1){
			fill(240, 255, 13); //grid alive
			rect(x, y, res - 1 , res - 1);
		  } 
		}
	}
  }
  
	else if(isRunning == 1){
	for (let i = 0; i < cols; i++){
	  for (let j = 0; j < rows; j++){
		let x = i * res;
		let y = j * res;
		stroke(0); //grid color
		fill(0);       //grid fill (dead)
		rect(x, y, res - 1 , res - 1);
		if(grid[i][j] == 1){
		  fill(240, 255, 13); //grid alive
		  rect(x, y, res - 1 , res - 1);
		} 
	  }
	}
  
	
  
	  let next = make2DArray(cols, rows);
  
	//compute next based on grid
	  for(let i = 0; i < cols; i++){
		for(let j = 0; j < cols; j++){
		  let state = grid[i][j];
		  let sum = 0;
		  let neighbors = countNeighbors(grid, i, j);
  
		  if (state == 0 && neighbors == 3){
			next[i][j] = 1;
		  } else if (state == 1 && neighbors < 2 || neighbors > 3){
			next[i][j] = 0;
		  }else{
			next[i][j] = state;
		  }
	  }
	}
  
  grid = next;
  }}



  function countNeighbors(grid, x, y) {
	let sum = 0;
	for (let i = -1; i < 2; i++) {
	  for (let j = -1; j < 2; j++) {
		let col = (x + i + cols) % cols;
		let row = (y + j + rows) % rows;
		sum += grid[col][row];
	  }
	}
	sum -= grid[x][y];
	return sum;
  }
 




