function setBoxSize(gridSize){
    //returns the size of either side of a grid box, depending on the input size of the grid.
    return parseFloat($('.checkboard').css('height'))/gridSize;
}

function createGrid(gridSize, boxSize){
    //creates a grid based on the desired length of the sides and the size of each grid box
    var horGridCounter = 0;     //keeps track of how many horiz boxes have been made
    var verGridCounter = 0;     //keeps track of how many vert boxes have been made
    while(verGridCounter < gridSize ){
        //creates rows to fill out the grid according to the length of the grid
        while(horGridCounter < gridSize){
            //adds a box to the grid, one piece at a time, in rows
            var curSquare = "<div class='grid-square flex-center' data-occupied=0></div>"
            $(curSquare).appendTo(".checkboard").css({'width':boxSize,'height':boxSize});
            horGridCounter++;
        }
        //resets the horiz grid counter because we have made a full row
        horGridCounter = 0;
        verGridCounter++;
    }
}

function toggleMark(mark){
    mark ^= 1;
    return mark;
}

function placeMark(markSelector, destination){
    var mark = '';
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
    }
}

var gridSize = 3;
//keeps track of whose turn it is. human1, human2, cpu
var currentPlayersTurn = 'human1'
var currentMark = 0; //keeps track of current mark. 0 is O, 1 is X

//dynamically creates a grid based on the user's monitor size
var boxSize = setBoxSize(gridSize);
createGrid(gridSize, boxSize);

$('.checkboard .grid-square').on('click', function(){
    placeMark(currentMark, $(this));
    currentMark = toggleMark(currentMark);
});
