/* global $, document*/
$(document).ready(function(){
	
	modal();
	
	$("div div div").addClass("puzzlepiece");
	var tiles = document.getElementsByClassName("puzzlepiece");
	var x = parseInt($("#puzzlearea").css("top"));
	var y = parseInt($("#puzzlearea").css("left"));
	var bkX = 300;
	var bkY = 300;
	var picx = 0;
	var picy = 0;
	var gameStart = false;

	for(var i=0; i < tiles.length; i++){
		// Fix the image orientation on the div
		$(tiles[i]).css("background-position", picx + "px " + picy + "px");
		picx -= 100;

		if(picx%400 == 0){ 
			picy -= 100; 
		}

		// Fix the orientation of each div
		$(tiles[i]).css("top", y);
		$(tiles[i]).css("left", x);
		x += 100;

		if(i !=0 && (i+1)%4 == 0){ 
			y += 100; 
			x = parseInt($("#puzzlearea").css("top")); 
		}

		// Check if tiles are near blank tile
		var check = function(piece){
			if(((parseInt($(piece).css("top")) - bkY == 100 || parseInt($(piece).css("top")) - bkY == -100) && parseInt($(piece).css("left")) - bkX == 0) || ((parseInt($(piece).css("left")) - bkX == 100 || parseInt($(piece).css("left")) - bkX == -100) && parseInt($(piece).css("top")) - bkY == 0)){
				return true;
			}
			else{ 
				return false; 
			}
		};

		// Tile glows when mouse hovers
		$(tiles[i]).on("mouseover", function(){
			if(check(this)){ 
				$(this).addClass("movablepiece"); 
			}
		});

		// Movable class remains when mouse moves from tile
		$(tiles[i]).on("mouseleave", function(){
			$(this).removeClass("movablepiece");
		});

		// Switch Tiles
		var switchTile = function(move){
			var tempX = bkX;
			var tempY = bkY;

			bkY = parseInt($(move).css("top"));
			bkX = parseInt($(move).css("left"));

			$(move).css("top", tempY);
			$(move).css("left", tempX);
		};

		// Check that tile is beside the blank before switching
		var moveTile = function(){
			var lst = []; 
			for(var i=0; i < tiles.length; i++){
				if (check(tiles[i]) == true){
					lst.push(tiles[i]);
				}
			}
			var move = lst[Math.floor(Math.random() * lst.length)];
			switchTile(move);
		};

		// Tile switched with blank when clicked
		$(tiles[i]).on("click", function(){
			//added here so that you can't move a tile if the game 
			//hasn't stated
			if(gameStart){
				if(check(this)){ 
					switchTile(this); 
					if(gameEnded()){
						//shows the pop up when game is won
						$(".modal").css({
							display: 'block'
						});
					}
				}
			}
		});
		
		
	}

	$("#shufflebutton").on("click", function(){
			
			if(!gameStart){
			var times = Math.floor(Math.random() * 100) + 100;
			for(var i=0; i < times; i++){
				moveTile();
			}
			// Changes the state of the game
			gameStart = true;
		}
	});
	
	$(".modal").click(function(){
		$(".modal").css({
			display: 'none'
		});
	})
});

function gameEnded(){
	// Save the original state of the game
	var state = {
		1:{top : '0px', left : '0px'},
		2:{top : '0px', left : '100px'},
		3:{top : '0px', left : '200px'},
		4:{top : '0px', left : '300px'},
		5:{top : '100px', left : '0px'},
		6:{top : '100px', left : '100px'},
		7:{top : '100px', left : '200px'},
		8:{top : '100px', left : '300px'},
		9:{top : '200px', left : '0px'},
		10:{top : '200px', left : '100px'},
		11:{top : '200px', left : '200px'},
		12:{top : '200px', left : '300px'},
		13:{top : '300px', left : '0px'},
		14:{top : '300px', left : '100px'},
		15:{top : '300px', left : '200px'}
	};
	
	var i = 1;
	var end = true;
	$.each( $( '#puzzlearea div' ), function( ) { 
		if(!(state[i].top == $(this).css("top") && state[i].left == $(this).css("left"))){
			end = false;
		}
		i++;
	});
	return end;
}


function modal(){
	$('<div></div>', {
		id: 'modal',
		class: 'modal'
	}).appendTo('body');
	
	$('<div></div>', {
		id: 'modal-content',
		class: 'modal-content'
	}).appendTo('.modal');
	
	$('<h1></h1>', {
		id: 'winner',
		class: 'winner',
		text: 'Winner!!!'
	}).appendTo('.modal-content');
	
	$(".modal").css({
		display: 'none',
		position: 'fixed', 
		'z-index': 1,
		left: 0,
		top: 0,
		width: '100%',
		height: '100%', 
		overflow: 'auto', 
		'background-color': 'rgb(0,0,0)', 
		'backgroundColor': 'rgba(0,0,0,0.4)' 
	});
	
	$('.modal-content').css({
		'background-color': '#fefefe',
		margin: '15% auto',
		padding: '20px',
		border: '1px solid #888',
		width: '80%'
	});

}
