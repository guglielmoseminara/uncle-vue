import {
    List,
    Form,
    Filter,
    Summary,
    Group,
} from './index';

export default class TagBuilder {

    constructor() {
        this.tagsMap = {
            'list': List,
            'form': Form,
            'filter': Filter,
            'summary': Summary,
            'group': Group,
        }
    }

    build(tag) {
        console.log(tag);
        var module = this.tagsMap[tag];
        return new module();
    }

}