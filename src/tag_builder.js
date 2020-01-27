import {
    List,
    Form,
    Filter,
    Summary,
    Group,
    Breadcrumb,
    Modal,
} from './index';

export default class TagBuilder {

    constructor() {
        this.tagsMap = {
            'list': List,
            'form': Form,
            'filter': Filter,
            'summary': Summary,
            'group': Group,
            'breadcrumb': Breadcrumb,
            'modal': Modal,
        }
    }

    build(tag) {
        var module = this.tagsMap[tag];
        return new module().setClassName(tag);
    }

}