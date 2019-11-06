import {
    Item,
    ItemAction,
} from './index';

export default class ItemBuilder {

    getItem(parentEl) {
        const item = parentEl.querySelector(`items`);
        if (item.getAttribute('action')) {
            return new ItemAction();    
        } 
        return new Item();
    }

}