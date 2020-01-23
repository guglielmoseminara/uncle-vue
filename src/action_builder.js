import {
    Action,
    ActionSdk,
    ActionNav,
    ActionModal,
    ActionNotify,
    ActionService,
    ActionEvent,
} from './index';

export default class ActionBuilder {

    getAction(parentEl, actionName) {
        const type = parentEl.querySelector(`actions > action[name='${actionName}']`).getAttribute('type');
        if (type == 'sdk') {
            return new ActionSdk();    
        } else if (type == 'nav') {
            return new ActionNav();
        } else if (type == 'modal') {
            return new ActionModal();
        } else if (type == 'notify') {
            return new ActionNotify();
        } else if (type == 'service') {
            return new ActionService();
        } else if (type == 'event') {
            return new ActionEvent();
        }
        return new Action();
    }

}