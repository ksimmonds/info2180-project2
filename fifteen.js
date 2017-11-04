$(document).ready(function(){
	$("div div div").addClass("puzzlepiece");
	var tiles = document.getElementsByClassName("puzzlepiece");
    var x = parseInt($("#puzzlearea").css("top"));
    var y = parseInt($("#puzzlearea").css("left"));
    var bkX = 300;
    var bkY = 300;
    var picx = 0;
    var picy = 0;

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

		// Tile switched with blank when clicked
		$(tiles[i]).on("click", function(){
			if(check(this)){ 
				switchTile(this); 
			}
		});
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

	$("#shufflebutton").on("click", function(){
		times = Math.floor(Math.random() * 100) + 100;
		for(var i=0; i < times; i++){
			moveTile();
		}
	});
});