import Component from './component.js';

import './mode.css';

export default class Mode extends Component {
    static getRootClass() {
        return '.mode';
    }

    constructor(root) {
        super(root);
        this.reset();

        root.addEventListener("click", this.handleDomClick.bind(this));
    }

    reset() {
        // do nothing
    }

    handleDomClick(e) {
        this.fire('click');
    }
}