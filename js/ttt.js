// A GOOD PART OF THIS CODE IS BASED ON THE ONE WRITTEN BY JUAN GABRIEL RODRÍGUEZ CARRIÓN IN JLAB STUDIO. YOU CAN SEE IT IN http://www.jlabstudio.com/webgl/2013/09/tutorial-de-algoritmos-en-javascript-minimax-tres-en-raya/

var player = {
    human:1,
    cpu:2
  }
  var state = {
    playing:0,
    waiting:1,
    done:2
  }
  
  var pick;
  
  function board() {
    this.panel=[];
  
    this.cells=[];
    for (var i=0;i<9;i++) {
      this.cells.push(document.getElementById("cell"+ (i+1)));
    }
  }
  
  board.prototype.reset = function() {
    this.panel = [0,0,0,0,0,0,0,0,0];
  }
  
  board.prototype.markable = function(pos) {
    return this.panel[pos]==0;
  }
  
  board.prototype.mark = function(turn, pos) {
    this.panel[pos] = turn;
  }
  
  board.prototype.checkWin = function(player) {
    var bool = (this.panel[0] === player && this.panel[1] === player && this.panel[2] === player);
    bool = bool || (this.panel[3] === player && this.panel[4] === player && this.panel[5] === player);
    bool = bool || (this.panel[3] === player && this.panel[4] === player && this.panel[5] === player);
    bool = bool || (this.panel[6] === player && this.panel[7] === player && this.panel[8] === player);
  
    bool = bool || (this.panel[0] === player && this.panel[3] === player && this.panel[6] === player);
    bool = bool || (this.panel[1] === player && this.panel[4] === player && this.panel[7] === player);
    bool = bool || (this.panel[2] === player && this.panel[5] === player && this.panel[8] === player);
  
    bool = bool || (this.panel[0] === player && this.panel[4] === player && this.panel[8] === player);
    bool = bool || (this.panel[2] === player && this.panel[4] === player && this.panel[6] === player);
    return bool;
  }
  
  board.prototype.emptyCells = function() {
    var n = this.panel.length;
    for (var i=0;i<n;i++) {
      if (this.panel[i] === 0) {
        return true;
      }
    }
    return false;
  }
  
  board.prototype.draw = function() {
    var n = this.panel.length;
    var humanSign = pick;
    var cpuSign = (pick === "X")? "O":"X";
    for (var i=0;i<n;i++) {
      if (this.panel[i] === 0) {
        this.cells[i].innerHTML = "";
      } else {
        this.cells[i].innerHTML = (this.panel[i] === player.human)? humanSign:cpuSign;
      }
    }
  }
  
  function game() {
    this.games = 0;
    this.board = new board();
    this.state = null;
  
    this.reset();
  }
  
  game.prototype.reset = function() {
    this.board.reset();
    this.board.mark(player.cpu, Math.floor(Math.random() * 9));
    this.status = state.playing;
    this.board.draw();
  };
  
  game.prototype.logic = function(pos) {
    if (this.status === state.playing) {
      if (this.board.markable(pos)) {
        this.board.mark(player.human, pos);
  
        if (this.board.checkWin(player.human)) {
          this.status = state.done;
        } else if (!this.board.emptyCells()) {
          this.status = state.done;
        } else {
          this.status = state.waiting;
          this.moveAI();
  
          if (this.board.checkWin(player.cpu)) {
            this.status = state.done;
          } else if (!this.board.emptyCells()) {
            this.status = state.done;
          } else {
            this.status = state.playing;
          }
        }
      }
      this.board.draw();
    } else if(this.status === state.done) {
      this.win();
    }
      if (this.board.checkWin(player.cpu)) {
            this.win();
          }
  };
  
  game.prototype.win = function() {
    var div = $("<div/>").addClass("container-fluid");
    div.append($("<h4/>").html("GAME OVER"));
    div.append($("<button/>").addClass("btn btn-primary").html("New Game"));
    $("body").append(div);
    $("button").on("click", resetGame);
  }
  
  game.prototype.moveAI=function(){
          var pos=0;
          var n=this.board.panel.length;
          var aux, best=-9999;
  
          for (var i=0;i<n;i++)
          {
              if (this.board.markable(i))
              {
                  this.board.mark(player.cpu,i);
                  aux=this.min();
                  if (aux>best)
                  {
                      best=aux;
                      posicion=i;
                  }
                  this.board.mark(0,i);
              }
          }
  
          this.board.mark(player.cpu,posicion);
  };
  
  game.prototype.min=function(){
          if (this.board.checkWin(player.cpu)) return 1;
          if (!this.board.emptyCells()) return 0;
          var n=this.board.panel.length;
          var aux,best=9999;
  
          for (var i=0;i<n;i++)
          {
              if (this.board.markable(i))
              {
                  this.board.mark(player.human,i);
                  aux=this.max();
                  if (aux<best)
                  {
                      best=aux;
                  }
                  this.board.mark(0,i);
              }
          }
          return best;
  };
  
  game.prototype.max=function(){
          if (this.board.checkWin(player.human)) return -1;
          if (!this.board.emptyCells()) return 0;
          var n=this.board.panel.length;
          var aux,best=-9999;
  
          for (var i=0;i<n;i++)
          {
              if (this.board.markable(i))
              {
                  this.board.mark(player.cpu,i);
                  aux=this.min();
                  if (aux>best)
                  {
                      best=aux;
                  }
                  this.board.mark(0,i);
              }
          }
          return best;
  };
  
  function logicPicker(e) {
    Game.logic(parseInt(e.target.getAttribute("cell")));
  }
  
  function init(e) {
    pick = (e.target.getAttribute("pick") === "1")? "X":"O";
  
      $(".container-fluid").remove();
  
      Game = new game();
  
      $(".square").on("click", logicPicker);
  }
  
  function resetGame() {
    Game.reset();
    $(".container-fluid").remove();
  }
  
  $(document).ready(function() {
    $("button").on("click", init);
  });