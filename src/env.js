import { BaseElement } from './index';

export default class Env extends BaseElement {

    constructor() {
        super();
    }

    build() {
        this.envEl = this.mainEl.querySelector(`env`);
        if (this.envEl) {
            this.variables = Array.from(this.envEl.querySelectorAll('variable')).reduce((variables, item) => {
                variables[item.getAttribute('name')] = item.innerHTML;
                return variables;
            }, {});    
        }
        return this;
    }
}