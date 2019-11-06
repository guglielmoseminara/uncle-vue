import {
    Action,
    ActionSdk,
    ActionNav,
    ActionModal,
} from './index';

export default class ActionBuilder {

    getAction(mainEl, actionName) {
        const type = mainEl.querySelector(`actions action[name='${actionName}']`).getAttribute('type');
        if (type == 'sdk') {
            return new ActionSdk();    
        } else if (type == 'nav') {
            return new ActionNav();
        }  else if (type == 'modal') {
            return new ActionModal();
        }
        return new Action();
    }

}