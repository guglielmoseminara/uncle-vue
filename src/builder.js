import { 
    App, 
    Nav, 
    Route,
    NavItem,
    View,
    List,
    Rows,
    FieldBuilder,
    Pagination,
    Filter,
    Group,
    Sdk,
    ActionItem,
    ActionBuilder,
    TagBuilder,
    ApiBuilder,
    ItemBuilder,
    Tab,
    Form,
    Page,
    Method,
    Resource,
    Response,
    Request,
    Summary,
    Modal,
 } from './index';
 
export default class Builder {

    constructor(mainEl) {
        this.mainEl = mainEl;
        this.fieldBuilder = new FieldBuilder();
        this.actionBuilder = new ActionBuilder();
        this.tagBuilder = new TagBuilder();
        this.apiBuilder = new ApiBuilder();
        this.itemBuilder = new ItemBuilder();
        this.sdk = new Sdk();
    }

    build(tagName, name) {
        return this._getElement(this.tagBuilder.build(tagName), name);
    }

    getApp(appName) {
        return this._getElement(new App(), appName);
    }

    getSdk() {
        return this.sdk;
    }

    getNav(navName) {
        return this._getElement(new Nav(), navName);
    }

    getNavItem(navEl, navItemName) {
        return this._getElement(new NavItem(), navEl, navItemName);
    }

    getRoute(parentEl, routeName) {
        return this._getElement(new Route(), parentEl, routeName);
    }

    getView(viewName) {
        return this._getElement(new View(), viewName);
    }

    getList(listName) {
        return this._getElement(new List(), listName);    
    }

    getRows(parentEl) {
        return this._getElement(new Rows(), parentEl);    
    }

    getPage(viewEl) {
        return this._getElement(new Page(), viewEl);
    }

    getField(parentEl, fieldName) {
        return this._getElement(this.fieldBuilder.getField(parentEl, fieldName), parentEl, fieldName);
    }

    getPagination(listEl) {
        return this._getElement(new Pagination(), listEl);
    }

    getFilter(filterName) {
        return this._getElement(new Filter(), filterName);
    }

    getGroup(parentEl, groupName) {
        return this._getElement(new Group(), parentEl, groupName);
    }

    getActionItem(parentEl, actionName) {
        return this._getElement(new ActionItem(), parentEl, actionName);
    }

    getAction(actionName) {
        return this._getElement(this.actionBuilder.getAction(this.mainEl, actionName), actionName);
    }

    getTab(parentEl, tabName) {
        return this._getElement(new Tab(), parentEl, tabName);
    }

    getForm(formName) {
        return this._getElement(new Form(), formName);
    }

    getSummary(summaryName) {
        return this._getElement(new Summary(), summaryName);
    }

    getModal(modalName) {
        return this._getElement(new Modal(), modalName);
    }

    getItem(parentEl) {
        return this._getElement(this.itemBuilder.getItem(parentEl), parentEl);
    }

    getMethod(methodName) {
        return this._getElement(new Method(), methodName);
    }

    getApi(apiName) {
        return this._getElement(this.apiBuilder.getApi(this.mainEl, apiName), apiName);
    }

    getResource(apiEl, resourceName) {
        return this._getElement(new Resource(), apiEl, resourceName);
    }

    getResponse(apiEl) {
        return this._getElement(new Response(), apiEl);
    }

    getRequest(requestName) {
        return this._getElement(new Request(), requestName);
    }

    _getElement(instance, ...params) {
        return instance.setMainElement(this.mainEl).setBuilder(this).build(...params);
    }

}