import Component from './component.js';
import Mode from './mode.js';

import './navbar.css';

/*
 * [Event name: params]
 * none
 */
export default class Navbar extends Component {
    static getRootClass() {
        return '.navbar';
    }

    constructor(root) {
        super(root);

        this.brand = root.querySelector('.brand');
        this.reset();
        
        this.bt_easy = root.querySelector('.easy_mode');
        this.bt_hard = root.querySelector('.hard_mode');
        this.bt_nightmare = root.querySelector('.nightmare_mode');

        this.easy_mode = new Mode(this.bt_easy);
        this.hard_mode = new Mode(this.bt_hard);
        this.nightmare_mode = new Mode(this.bt_nightmare);

        this.easy_mode.on('click', this.toEasy.bind(this));
        this.hard_mode.on('click', this.toHard.bind(this));
        this.nightmare_mode.on('click', this.toNightmare.bind(this));
        //the default mode is "easy"
        this.current_mode = "easy";
        this.bt_easy.disabled = true;
        this.bt_easy.classList.add("curModeStyle");
    }

    reset() {
        // do nothing
    }

    toEasy() {
        this.current_mode = "easy";
        this.fire('changeToEasy');
        // Disable the mode bt where you are 
        this.bt_easy.disabled = true;
        this.bt_hard.disabled = false;
        this.bt_nightmare.disabled = false;
        // set the mode bt style
        this.bt_easy.classList.toggle("curModeStyle", true);
        this.bt_hard.classList.toggle("curModeStyle", false);
        this.bt_nightmare.classList.toggle("curModeStyle", false);
    }

    toHard() {
        this.current_mode = "hard";
        this.fire('changeToHard');
        // Disable the mode bt where you are 
        this.bt_easy.disabled = false;
        this.bt_hard.disabled = true;
        this.bt_nightmare.disabled = false;
        // set the mode bt style
        this.bt_easy.classList.toggle("curModeStyle", false);
        this.bt_hard.classList.toggle("curModeStyle", true);
        this.bt_nightmare.classList.toggle("curModeStyle", false);
    }

    toNightmare() {
        this.current_mode = "nightmare";
        this.fire('changeToNightmare');
         // Disable the mode bt where you are        
        this.bt_easy.disabled = false;
        this.bt_hard.disabled = false;
        this.bt_nightmare.disabled = true;
        // set the mode bt style
        this.bt_easy.classList.toggle("curModeStyle", false);
        this.bt_hard.classList.toggle("curModeStyle", false);
        this.bt_nightmare.classList.toggle("curModeStyle", true);
    }

    getCurrentMode() {
        return this.current_mode;
    }
}
