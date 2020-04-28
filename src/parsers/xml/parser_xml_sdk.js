import { Parser } from '../../index';
import { ParserXML } from './index';

export default class ParserXMLSdk extends Parser {

    constructor() {
        super();
        this.parser = new ParserXML();
    }

    init() {
        this.parser.init(this.uncleConfig.xmlConfig);
    }

    getAttribute(element, attribute) {
        return this.parser.getAttribute(element, attribute);
    }

    getMain() {
        return this.parser.get('uncle');
    }

    getApp(appName = null) {
        return this.parser.get(`apps > app[name='${appName ? appName : this.appName}']`);
    }

    getEnv() {
        return this.parser.get('env');
    }

    getApi(apiName) {
        return this.parser.get(`apis > api[name='${apiName}']`);
    }

    getApiRequest(api, requestName) {
        return this.parser.getChild(api, `requests > request[name='${requestName}']`);
    }

    getBreadcrumb(breadcrumbName) {
        const app = this.getApp();
        return this.parser.getChild(app, `breadcrumbs > breadcrumb[name="${breadcrumbName}"]`);
    }

    getSdkMethod(methodName) {
        const app = this.getApp();
        return this.parser.getChild(app, `sdk > method[name="${methodName}"]`);
    }

    getModal(modalName) {
        const app = this.getApp();
        return this.parser.getChild(app, `modals > modal[name="${modalName}"]`);
    }

    getNav(navName) {
        const app = this.getApp();
        return this.parser.getChild(app, `navs > nav[name="${navName}"]`);
    }

    getView(viewName) {
        const app = this.getApp();
        return this.parser.getChild(app, `views > view[name="${viewName}"]`);
    }

    getSummary(summaryName) {
        const app = this.getApp();
        return this.parser.getChild(app, `summaries > summary[name="${summaryName}"]`);
    }

    getElementAction(element, name) {
        return this.parser.getChild(element, `actions > action[name='${name}']`);
    }

    getElementActions(element) {
        return this.parser.getChildren(element, ':scope > action');
    }

    getElementParams(element) {
        return this.parser.getChildren(element, ':scope > params > param');
    }

    getElementActionItem(element, name) {
        return this.parser.getChild(element, `actions action-item[name=${name}]`);
    }

    getElementActionItems(element) {
        return this.parser.getChildren(element, `:scope > actions > action-item`);
    }

    getElementText(element) {
        return this.parser.getInnerHTML(element);
    }

    getParentForm(element) {
        return this.parser.getClosest(element, 'form')
    }

    getParentApp(element) {
        return this.parser.getClosest(element, 'app')
    }

    getParentApi(element) {
        return this.parser.getClosest(element, 'api')
    }

    getActionCases(action) {
        return this.parser.getChildren(action, 'case');
    }

    getActionConditions(action) {
        return this.parser.getChildren(action, 'condition');
    }

    getApiResource(api, resourceName) {
        return this.parser.getChild(api, `resources resource[name='${resourceName}']`);
    }

    getResourceRoute(resource, routeName) {
        return this.parser.getChild(resource, `routes route[name='${routeName}']`);
    }

    getElementRoute(element, routeName) {
        return this.parser.getChild(element, `routes > route[name='${routeName}']`);
    }

    getElementRoutes(element) {
        return this.parser.getChildren(element, ':scope > routes > route');
    }

    getElementField(element, fieldName) {
        return this.parser.getChild(element, `fields field[name='${fieldName}']`);
    }

    getElementOptions(element) {
        return this.parser.getChildren(element, 'options option');
    }

    getElementFormatter(element) {
        return this.parser.getChild(element, ':scope > formatter');
    }

    getElementFields(element) {
        return this.parser.getChildren(element, ':scope > fields > field');
    }

    getElementFieldsOrGrouped(element) {
        return this.parser.getChildren(element, ':scope > fields > field, :scope group > fields > field');
    }

    getNestedFields(element) {
        return this.parser.getChildren(element, `:scope > field`);
    }

    getElementRangeMin(element) {
        return this.parser.getChild(element, 'range min');
    }

    getElementRangeMax(element) {
        return this.parser.getChild(element, 'range max');
    }

    getNestedField(element, fieldName) {
        return this.parser.getChild(element, `:scope > field[name='${fieldName}']`);
    }

    getElementFieldStrict(element, fieldName) {
        return this.parser.getChild(element, `fields > field[name='${fieldName}']`);
    }

    getElementLabel(element) {
        return this.parser.getChild(element, `:scope > label`);
    }

    getElementVariables(element) {
        return this.parser.getChildren(element, 'variable');
    }

    getElementFilter(element, filterName) {
        return this.parser.getChild(element, `filters filter[name="${filterName}"]`);
    }

    getElementGroups(element) {
        return this.parser.getChildren(element, 'group');
    }

    getElementGroup(element, groupName) {
        return this.parser.getChild(element, `group[name=${groupName}]`);
    }

    getElementForm(element, formName) {
        return this.parser.getChild(element, `forms form[name="${formName}"]`);
    }

    getElementItem(element) {
        return this.parser.getChild(element, 'item');
    }

    getElementItems(element) {
        return this.parser.getChild(element, 'items');
    }

    getElementChildren(element) {
        return this.parser.getChildren(element);
    }

    getElementName(element) {
        return this.parser.getTagName(element);
    }

    getElementHeader(element, headerName) {
        return this.parser.getChild(element, `headers > header[name='${headerName}']`);
    }

    getElementHeaders(element) {
        return this.parser.getChildren(element, 'headers > header');
    }

    getElementList(element, listName) {
        return this.parser.getChild(element, `lists > list[name="${listName}"]`);
    }

    getInnerElements(element) {
        return this.parser.getInnerElements(element);
    }

    getElementNavItem(element, navItemName) {
        return this.parser.getChild(element, `nav-item[name="${navItemName}"]`);
    }

    getElementNavItems(element) {
        return this.parser.getChildren(element, ':scope > nav-item');
    }

    getElementNavItemsOrGrouped(element) {
        return this.parser.getChildren(element, ':scope > nav-item, group > nav-item');
    }

    getViewPage(view) {
        return this.parser.getChild(view, 'page');
    }

    getListPagination(list) {
        return this.parser.getChild(view, 'pagination');
    }

    getApiResource(api, resourceName) {
        return this.parser.getChild(api, `resources > resource[name="${resourceName}"]`);
    }

    getApiResponse(api, responseName) {
        return this.parser.getChild(api, `response[name="${responseName}"]`);
    }

    getApiResponses(api) {
        return this.parser.getChildren(api, `response`);
    }

    getApiDefaultResponse(api) {
        return this.parser.getChild(api, 'response[default=true]');
    }

    getElementRows(element) {
        return this.parser.getChild(element, 'rows');
    }
}