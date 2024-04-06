function start(){

let player1
    let player2

        do {
        player1 = prompt('Please insert Player 1 name: ')
        player1 = player1.toUpperCase()
        player2 = prompt('Please insert Player 2 name: ')
        player2 = player2.toUpperCase()

    } while (!player1 || !player2)

function gameOn (){
    
    function createPlayer(playerName){

        let playerMarker
        if(playerName === player1){
            playerMarker = 'X' 
        } else {
            playerMarker = 'O'
        }

        let score = 0
        const addScore = () => score++
        const getScore = () => score
        return { playerName, playerMarker, addScore, getScore }
    } 
    const playerX = createPlayer(player1)
    const playerO = createPlayer(player2)
    
    let head = document.getElementById('head')
    const player1Showing = document.createElement('div')
    const p = document.createElement('p')
    p.setAttribute('class', 'pName')
    head.appendChild(player1Showing)
    p.textContent= `${playerX.playerName} VS   ${playerO.playerName}`
    player1Showing.appendChild(p)
        
    const board = document.getElementById('board')
    const restartButton = document.getElementById('restart-button')
    let currentPlayer = 'X'
    let cells = document.querySelectorAll('.cell')
    let moves = 0

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (!cell.textContent) {
                cell.textContent = currentPlayer
                moves++
                if (checkWinner()) {
                    restartGame()
                    moves = 0
                } else if (moves === 9 ){
                    draw()
                    restartGame()
                    moves = 0
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
                }   
            }
        })
    })

function checkWinner() {
    let winner
    const winningCombs = [[0, 1, 2], [3, 4, 5], [6, 7, 8], //Horiz
                          [0, 3, 6], [1, 4, 7], [2, 5, 8], //Vert
                          [0, 4, 8], [2, 4, 6]]            //Diag

   for (let i = 0; i < winningCombs.length; i++) {

       const condition = winningCombs[i];
       let count = 0;
       for (let j = 0; j < condition.length; j++) {
           const index = condition[j];
           if (cells[index].textContent === currentPlayer) {
               count++;
           }
       }
       if (count === 3) {
           if(currentPlayer === 'X'){
                winner = playerX
                playerX.addScore()
                showScore()
                alert(`${playerX.playerName} wins!`)
                
           } else if (currentPlayer === 'O'){
                winner = playerO
                playerO.addScore()
                showScore()
                alert(`${playerO.playerName} wins!`)
           }
        console.log(`Player 1: ${playerX.getScore()} - Player 2: ${playerO.getScore()}`)
        return true
       }
   }
   return false
}

function draw(){
    alert("It's a draw! - Click Restart button to play again!")

}

function showScore(){
    const showScore = document.getElementById('score-board')
    let player1Score = `${playerX.playerName} - ${playerX.getScore()} POINTS`
    let player2Score = `${playerO.playerName} - ${playerO.getScore()} POINTS`
    showScore.innerHTML = `${player1Score}<br>${player2Score}` 
}
    
function restartGame() {
    cells.forEach(cell => {
        cell.textContent = ''
    });
    currentPlayer = 'X'
}

restartButton.addEventListener('click', restartGame)

}
gameOn()
}
start()