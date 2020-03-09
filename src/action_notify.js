import { Action } from './index';

export default class ActionNav extends Action { 

    constructor() {
        super();
    }

    build(actionName) {
        super.build(actionName);
        const languageProvider = this.serviceManager.getLanguageProvider();
        this.text = languageProvider.parse(this.actionEl.getAttribute('text'));
        this.state = this.actionEl.getAttribute('state');
        return this;
    }

    executeChild(params = null) {
        const notifier = this.serviceManager.getNotifier();
        console.log(notifier, this.state, this.name, this.actionEl);
        notifier[this.state](this.text);
        return true;
    }

}