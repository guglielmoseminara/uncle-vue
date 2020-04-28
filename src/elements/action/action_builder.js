import {
    Action,
    ActionSdk,
    ActionNav,
    ActionModal,
    ActionNotify,
    ActionService,
    ActionEvent,
    ActionChain,
} from './index';

import { BaseBuilder } from '../../index'; 

export default class ActionBuilder extends BaseBuilder {

    getAction(parentEl, actionName) {
        const type = this.parser.getAttribute(this.parser.getElementAction(parentEl, actionName), 'type');
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
        } else if (type == 'chain') {
            return new ActionChain();            
        }
        return new Action();
    }

}