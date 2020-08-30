import Component from  './component.js';

import './board.css';

/*
 * [Event name: params]
 * click: this, color
 */
export default class Board extends Component {
    static getRootClass() {
        return '.board';
    }

    constructor(root, color) {
        super(root);

        this.colorDisplay = root.querySelector('.color-picked');
        this.messageDisplay = root.querySelector('.message');
        this.countDownDitgit = root.querySelector('.countDown');

        this.color = color; //pickedColor
        this.currentMode = "easy";
        this.num = 5;

        this.reset(color, this.currentMode);
    }

    reset(color, currentMode) {
        this.currentMode = currentMode;
        this.color = color;
        this.colorDisplay.textContent = color;
        this.messageDisplay.textContent = "What's the Color?";

        console.log(this.currentMode);
        if(this.currentMode !== "nightmare"){
            this.countDownDitgit.style.display = "none";
        }
        else {
            this.num = 5;

            this.countDownDitgit.style.display = "inline";
            this.countDownDitgit.textContent = this.num;

            // this.countDownID = window.setInterval(countdownfunc, 1000, this);
            // this.countDownID = setInterval(this.countdownfunc.bind(this), 1000);
            this.countDownID = setInterval(() => this.countdownfunc(), 1000);

            // function countdownfunc(the) {
            //     the.num--;
                
            //     if(the.num === 0 || the.currentMode !== "nightmare"){
            //         clearInterval(the.countDownID);
            //         the.countDownDitgit.style.display = "none";
            //         if(the.num === 0)
            //             the.timeoutFunc();
            //     }
            //     else
            //         the.countDownDitgit.textContent = the.num;
            // }
        }
    }

    showColor(color) {
        this.colorDisplay.textContent = color;
    }

    showWrongMessage() {
        this.messageDisplay.textContent = "Try Again";
    }

    showCorrectMessage() {
        this.messageDisplay.textContent = "Correct!";

        if(this.currentMode === "nightmare"){
            clearInterval(this.countDownID);
            this.countDownDitgit.style.display = "none";
        }
    }

    timeoutFunc() {
        this.messageDisplay.textContent = "TIMEOUT!";
        this.fire('timeout', this.color);
    }

    cleartheTimer() {
        clearInterval(this.countDownID);
    }

    countdownfunc() {
        this.num--;
        
        if(this.num === 0 || this.currentMode !== "nightmare"){
            clearInterval(this.countDownID);
            this.countDownDitgit.style.display = "none";
            if(this.num === 0)
                this.timeoutFunc();
        }
        else
            this.countDownDitgit.textContent = this.num;
    }
}