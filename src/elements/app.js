import { BaseElement } from '../index';

export default class App extends BaseElement {

    constructor() {
        super();
    }
    
    getSdk() {
        return this.builder.getSdk();
    }

    getNav(navName) {
        return this.builder.getNav(navName);
    }

    getAction(actionName) {
        return this.builder.getAction(actionName);
    }

    getRoute(routeName) {
        return this.builder.getRoute(this.appEl, routeName);
    }

    getView(viewName) {
        return this.builder.getView(viewName);
    }

    getList(listName) {
        return this.builder.getList(listName);
    }

    getFilter(filterName) {
        return this.builder.getFilter(filterName);
    }

    getForm(formName) {
        return this.builder.getForm(formName);
    }

    getModal(modalName) {
        return this.builder.getModal(modalName);
    }

    getSummary(summaryName) {
        return this.builder.getSummary(summaryName);
    }

    getBreadcrumb(breadcrumbName) {
        return this.builder.getBreadcrumb(breadcrumbName);
    }

    getBuilder() {
        return this.builder;
    }

    getRoutes() {
        const routes = this.parser.getElementRoutes(this.appEl);
        return Array.from(routes).map((route) => {
            return this.builder.getRoute(this.appEl, route.getAttribute('name'));
        });
    }

    build(appName) {
        this.appEl = this.parser.getApp(appName);
        this.name = appName;
        return this;
    }
}