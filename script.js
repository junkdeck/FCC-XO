function setBoxSize(gridSize){
  //returns the size of either side of a grid box, depending on the input size of the grid.
  return parseFloat($('.checkboard').css('height'))/gridSize;
}

function createGrid(gridSize, boxSize){
  //creates a grid based on the desired length of the sides and the size of each grid box
  var horGridCounter = 0;     //keeps track of how many horiz boxes have been made
  var verGridCounter = 0;     //keeps track of how many vert boxes have been made
  var i = 0;  // array index counter
  while(verGridCounter < gridSize ){
    //creates rows to fill out the grid according to the length of the grid
    while(horGridCounter < gridSize){
      //adds a box to the grid, one piece at a time, in rows
      var curSquare = "<div id='"+i+"' class='grid-square flex-center' data-occupied=0></div>"
      $(curSquare).appendTo(".checkboard").css({'width':boxSize,'height':boxSize});
      horGridCounter++;
      i++;
    }
    //resets the horiz grid counter because we have made a full row
    horGridCounter = 0;
    verGridCounter++;
  }
}

function toggleMark(mark){
  // toggles mark between 0 & 1 -- XOR gate
  mark ^= 1;
  return mark;
}

function checkWinner(playField, mark){
  // determines the winner based on pre-set win conditions
  winner = null;
  // win conditions
  winningCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (var j = 0; j < winningCombo.length; j++){
    if(playField[winningCombo[j][0]] == mark &&
      playField[winningCombo[j][1]] == mark &&
      playField[winningCombo[j][2]] == mark){
        winner = mark;
        console.log("winning move: "+winningCombo[j]);
    }
  }
  return winner;
}

function placeMark(markSelector, destination){
  var mark = '';
  var marked = 0;
  switch(markSelector){
    case 0:
    mark = 'X';
    break;
    case 1:
    mark = 'O';
    break;
  }
  if(destination.data('occupied') === 0){
    destination.append(mark);
    destination.data('occupied',1)
    marked = 1;
  }
  return marked;
}

function getRandom(min,max){
  return Math.random()*(max-min)+min;
}

function AIMove(playField){
  var randField = Math.floor(getRandom(0,playField.length));

  if(playField[randField] != null){
    console.log(randField+" occupied.");
    return AIMove(playField);
  }else{
    console.log(randField+" empty.");
    return randField;
  }
}

var gameRunning = 1;

var playField = new Array(9); // keeps track of marks on the field
var players = ["X","O"];  // player names
var winner = null;
var marked = 0; // changes to 1 if a mark was actually placed on click
var gridSize = 3;
//keeps track of whose turn it is. human1, human2, cpu
var currentPlayer = 'human1'
var currentMark = 0; //keeps track of current mark. 0 is O, 1 is X

var roundCounter = 0;

//dynamically creates a grid based on the user's monitor size
var boxSize = setBoxSize(gridSize);
createGrid(gridSize, boxSize);

$('.checkboard .grid-square').on('click', function(){
  if(gameRunning){
    marked = placeMark(currentMark, $(this));

    if(marked == 1){
      // sets placed mark in playfield array
      playField[$(this).attr('id')] = currentMark;

      // check winner
      winner = checkWinner(playField, currentMark);

      // next players turn
      currentMark = toggleMark(currentMark);
      if(winner == null){
        // only do ai if player didnt win
        var ai = AIMove(playField);
        playField[ai] = currentMark;
        placeMark(currentMark, $('#'+ai));
        // check winner, again ( this time for the ai )
        winner = checkWinner(playField, currentMark);
      }
      currentMark = toggleMark(currentMark);
      $(".messages").empty().append("<h1>"+players[currentMark]+"'s turn!</h1>");
      roundCounter++;
    }

    if(winner != null){
      $(".messages").empty().append("<h1>"+players[winner]+" wins!</h1>");
      gameRunning = 0;
      return 0;
    }
    if(roundCounter >= 9){
      $(".messages").empty().append("<h1>It's a draw. Game Over!</h1>");
    }
  }
});
