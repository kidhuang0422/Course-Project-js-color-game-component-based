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

        //modified
        this.m_easy = root.querySelector('.easy_mode');
        this.m_hard = root.querySelector('.hard_mode');
        this.easy_mode = new Mode(this.m_easy);
        this.hard_mode = new Mode(this.m_hard);
        this.easy_mode.on('click', this.handleEasyClick.bind(this));
        this.hard_mode.on('click', this.handleHardClick.bind(this));
        this.easy_mode.on('mouseover', this.handleEasyOver.bind(this));
        this.easy_mode.on('mouseout', this.handleEasyOut.bind(this));
        this.hard_mode.on('mouseover', this.handleHardOver.bind(this));
        this.hard_mode.on('mouseout', this.handleHardOut.bind(this));
        //the default mode is "easy"
        this.m_easy.style.backgroundColor = "#0066FF";
        this.m_easy.style.color = "#FFFFFF";
        this.current_mode = "easy";
    }

    reset() {
        // do nothing
    }

    handleEasyClick() {
        this.current_mode = "easy";
        this.m_hard.style.backgroundColor = "#FFFFFF";
        this.m_hard.style.color = "#000000";
        this.m_easy.style.backgroundColor = "#0066FF";
        this.m_easy.style.color = "#FFFFFF";
    }

    handleHardClick() {
        this.current_mode = "hard";
        this.m_easy.style.backgroundColor = "#FFFFFF";
        this.m_easy.style.color = "#000000";
        this.m_hard.style.backgroundColor = "#0066FF";
        this.m_hard.style.color = "#FFFFFF";
    }

    handleEasyOver() {
        if(this.current_mode === "hard")
            this.m_easy.style.color = "#0066FF";
    }

    handleEasyOut() {
        if(this.current_mode === "hard")
            this.m_easy.style.color = "#000000";
    }

    handleHardOver() {
        if(this.current_mode === "easy")
            this.m_hard.style.color = "#0066FF";
    }

    handleHardOut() {
        if(this.current_mode === "easy")
            this.m_hard.style.color = "#000000";
    }
}
