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
        // modified
        this.navbar.on('changeToHard', this.handleToHard.bind(this));
        this.navbar.on('changeToEasy', this.handleToEasy.bind(this));
        //modified
        this.deck = new Deck(root.querySelector('.deck'), this.navbar.current_mode);
        this.deck.on('wrongClick', this.handleDeckWrongClick.bind(this));
        this.deck.on('rightClick', this.handleDeckRightClick.bind(this));
        this.deck.on('modeReset', this.handleRestClick.bind(this));

        this.board = new Board(root.querySelector('.board'), this.deck.getPickedColor());

        this.reset = new Reset(root.querySelector('.reset'));
        this.reset.on('click', this.handleRestClick.bind(this));
    }

    handleDeckWrongClick(firer) {
        this.board.showWrongMessage();
    }

    handleDeckRightClick(firer, pickedColor) {
        this.root.style.backgroundColor = pickedColor;
        this.board.showCorrectMessage();
        this.reset.showPlayAgain();
    }

    handleRestClick() {
        this.root.style.backgroundColor = "#232323";

        this.deck.reset();
        this.board.reset(this.deck.getPickedColor());
        this.reset.reset();
    }

    handleToHard() {
        this.deck.showHardCard();
    }

    handleToEasy() {
        this.deck.hideHardCard();
    }
}

window.onload = function() {
    const body = document.querySelector('body');
    new Main(body);
};
