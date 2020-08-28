import Component from  './component.js';
import Navbar from  './navbar.js';
import Board from  './board.js';
import Deck from  './deck.js';
import Reset from  './reset.js';

import './main.css';

export default class Main extends Component {
    static getRootClass() {
        return '.main';
    }

    constructor(root) {
        super(root);

        this.navbar = new Navbar(root.querySelector('.navbar'));

        this.navbar.on('changeToEasy', this.handleToEasy.bind(this));
        this.navbar.on('changeToHard', this.handleToHard.bind(this));
        this.navbar.on('changeToNightmare', this.handleToNightmare.bind(this));

        this.deck = new Deck(root.querySelector('.deck'));

        this.deck.on('wrongClick', this.handleDeckWrongClick.bind(this));
        this.deck.on('rightClick', this.handleDeckRightClick.bind(this));

        this.board = new Board(root.querySelector('.board'), this.deck.getPickedColor());

        this.board.on('timeout', this.handleTimeOut.bind(this));

        this.resetButton = root.querySelector('.reset');
        this.reset = new Reset(this.resetButton);

        this.reset.on('click', this.handleRestClick.bind(this));
    }

    handleToEasy() {
        this.deck.hideHardCard();
        this.handleRestClick();
    }

    handleToHard() {
        this.deck.showHardCard();
        this.handleRestClick();
    }

    handleToNightmare() {
        this.deck.showHardCard();
        this.handleRestClick();
    }

    handleDeckWrongClick(firer) {
        this.board.showWrongMessage();
    }

    handleDeckRightClick(firer, pickedColor) {
        this.root.style.backgroundColor = pickedColor;
        this.board.showCorrectMessage();
        this.reset.showPlayAgain();

        if(this.navbar.getCurrentMode() === "nightmare"){   //reset
            this.root.classList.remove("blink");
            this.board.cleartheTimer();
            this.resetButton.style.display = "block";
        }        
    }

    handleRestClick() {
        this.root.style.backgroundColor = "#232323";
        this.deck.reset();
        this.board.reset(this.deck.getPickedColor(), this.navbar.getCurrentMode());
        this.reset.reset();

        if(this.navbar.getCurrentMode() === "nightmare"){
            this.root.classList.add("blink");
            this.resetButton.style.display = "none";
        }
        else {
            this.root.classList.remove("blink");
            this.resetButton.style.display = "block";
            this.board.cleartheTimer();
        }  
    }

    handleTimeOut(firer, pickedColor) { // to handle the timeout background
        console.log(pickedColor);
        this.root.style.backgroundColor = pickedColor;
        this.root.classList.remove("blink");  
        this.deck.gameOver = true; //can not click the card
        this.deck.timeout_fade();
        this.resetButton.style.display = "block";
        this.reset.showPlayAgain();  
    }
}

window.onload = function() {
    const body = document.querySelector('body');
    new Main(body);
};
