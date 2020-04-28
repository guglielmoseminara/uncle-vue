import { Action } from './index';

export default class ActionNav extends Action { 

    constructor() {
        super();
    }

    build(actionName) {
        super.build(actionName);
        const languageProvider = this.serviceManager.getLanguageProvider();
        this.text = languageProvider.parse(this.parser.getAttribute(this.actionEl, 'text'));
        this.state = this.parser.getAttribute(this.actionEl, 'state');
        return this;
    }

    executeChild(params = null) {
        const notifier = this.serviceManager.getNotifier();
        notifier[this.state](this.text);
        return true;
    }

}