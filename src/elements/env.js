import { BaseElement } from '../index';

export default class Env extends BaseElement {

    constructor() {
        super();
    }

    build() {
        this.envEl = this.parser.getEnv();
        if (this.envEl) {
            this.variables = Array.from(this.parser.getElementVariables(this.envEl)).reduce((variables, item) => {
                variables[this.parser.getAttribute(item)] = item.innerHTML;
                return variables;
            }, {});    
        }
        return this;
    }
}