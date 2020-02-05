import {
    Item,
    ItemAction,
} from './index';

export default class ItemBuilder {

    getItem(parentEl) {
        const item = parentEl.querySelector(`items`);
        const type = item.getAttribute('action') ? 'action' : null;
        return this.buildItem(type);
    }

    buildItem(type) {
        if (type == 'action') {
            return new ItemAction();
        } else {
            return new Item();
        }
    }

}