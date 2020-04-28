import {
    Item,
    ItemAction,
} from './index';

import { BaseBuilder } from '../../index'; 

export default class ItemBuilder extends BaseBuilder {

    getItem(parentEl) {
        const item = this.parser.getElementItems(parentEl);
        const type = this.parser.getAttribute(item, 'action') ? 'action' : null;
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