import { 
    App,
    Env, 
    Nav, 
    Route,
    RouteApi,
    NavItem,
    View,
    List,
    Rows,
    FieldBuilder,
    FieldFormatter,
    Pagination,
    Filter,
    Group,
    Sdk,
    ActionItem,
    ActionBuilder,
    TagBuilder,
    ApiBuilder,
    ItemBuilder,
    ServiceManager,
    ParamsManager,
    Form,
    Page,
    Method,
    Resource,
    Response,
    Request,
    Header,
    Summary,
    Modal,
    Breadcrumb,
 } from './index';

import moment from 'moment';

 
export default class Builder {

    constructor(parser, options) {
        this.parser = parser;
        this.mainEl = this.parser.getMain();
        this.momentManager = moment;
        if (options.locale) {
            require('moment/locale/'+options.locale+'.js');
            this.momentManager().locale(options.locale);
        }
        this.fieldBuilder = this._initElementBuilder(new FieldBuilder());
        this.actionBuilder = this._initElementBuilder(new ActionBuilder());
        this.tagBuilder = new TagBuilder();
        this.apiBuilder = this._initElementBuilder(new ApiBuilder());
        this.itemBuilder = this._initElementBuilder(new ItemBuilder());
        this.serviceManager = new ServiceManager();
        this.paramsManager = new ParamsManager(this.serviceManager);
        this.sdk = new Sdk();
    }

    build(tagName, name) {
        return this._getElement(this.tagBuilder.build(tagName), name);
    }

    buildField(type) {
        return this._initElement(this.fieldBuilder.buildField(type));
    }

    buildItem(type) {
        return this._initElement(this.itemBuilder.buildItem(type));
    }

    buildModal() {
        return this._initElement(new Modal());
    }

    getApp(appName) {
        return this._getElement(new App(), appName);
    }

    getEnv() {
        return this._getElement(new Env());
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

    getRouteApi(parentEl, routeName) {
        return this._getElement(new RouteApi(), parentEl, routeName);
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

    getFieldFormatter(parentEl) {
        return this._getElement(new FieldFormatter, parentEl);
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

    getForm(formName) {
        return this._getElement(new Form(), formName);
    }

    getSummary(summaryName) {
        return this._getElement(new Summary(), summaryName);
    }

    getBreadcrumb(breadcrumbName) {
        return this._getElement(new Breadcrumb(), breadcrumbName);
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

    getResponse(apiEl, responseName = null) {
        return this._getElement(new Response(), apiEl, responseName);
    }

    getRequest(apiEl, requestName) {
        return this._getElement(new Request(), apiEl, requestName);
    }

    getHeader(parentEl, headerName) {
        return this._getElement(new Header(), parentEl, headerName);
    }

    _initElement(instance){
        return instance.setMainElement(this.mainEl)
                .setParser(this.parser)
                .setBuilder(this)
                .setServiceManager(this.serviceManager)
                .setParamsManager(this.paramsManager)
                .setMomentManager(this.momentManager);
    }

    _initElementBuilder(instance){
        return instance
                .setParser(this.parser)
    }

    _getElement(instance, ...params) {
        return this._initElement(instance).build(...params);
    }

}