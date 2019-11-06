import {
    List,
    Form,
    Filter,
    Summary,
} from './index';

export default class TagBuilder {

    constructor() {
        this.tagsMap = {
            'list': List,
            'form': Form,
            'filter': Filter,
            'summary': Summary,
        }
    }

    build(tag) {
        var module = this.tagsMap[tag];
        return new module();
    }

}