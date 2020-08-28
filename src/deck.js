import Component from './component.js';
import Card from './card.js';

import './deck.css';

/*
 * [Event name: params]
 * wrongClick: this
 * rightClick: this, pickedColor
 */
export default class Deck extends Component {
    static getRootClass() {
        return '.deck';
    }

    constructor(root) {
        super(root);

        this.gameOver = false;
        this.cards = [];
        const els = root.querySelectorAll(Card.getRootClass());
        for (let el of els) {
            const card = new Card(el);
            card.on('click', this.handleCardClick.bind(this));
            this.cards.push(card);
        }
        this.pickedColor = this.pickColor();

        this.hideCards = root.querySelectorAll('.hide_card');
    }

    reset() {
        console.log(this.cards.length); //debug
        
        this.gameOver = false;
        for (let card of this.cards)
            card.reset();
        this.pickedColor = this.pickColor();
    }

    pickColor() {
        const random = Math.floor(Math.random() * this.cards.length);
        return this.cards[random].getColor();
    }

    getPickedColor() {
        return this.pickedColor;
    }

    handleCardClick(firer, color) {
        if (this.gameOver)
            return;

        if (color === this.pickedColor) {
            for (let card of this.cards)
                card.fadeIn("#FFF");
            this.gameOver = true;
            this.fire('rightClick', this.pickedColor);
        } else {
            firer.fadeOut();
            this.fire('wrongClick');
        }
    }    

    showHardCard() {
        if(this.cards.length === 3){
            for(let hc of this.hideCards){
                hc.classList.add("card");
                const hcard = new Card(hc);
                hcard.on('click', this.handleCardClick.bind(this));
                this.cards.push(hcard);
            }
        }
    }

    hideHardCard() {
        for(let hc of this.hideCards){
            hc.classList.remove("card");
            this.cards.pop();
        }
    }

    timeout_fade() {
        for (let card of this.cards)
            card.fadeIn("#FFF");
    }
}
