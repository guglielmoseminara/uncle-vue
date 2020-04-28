import { Loader, ServiceRouter, Cookie, StateManager, LanguageProvider, Utils } from './index';
import { ViewComponent } from './components';

export default class Uncle {

    constructor(Vue, options) {
        this.options = options;
        var loader = new Loader();
        loader.init(options);
        this.builder = loader.getBuilder();
        this.app = this.builder.getApp(options.app);
        this.env = this.builder.getEnv();
        this.vue = Vue;
        this.vue.prototype.$eventHub = new Vue();
        this._initProviders();
        //this._initPaths();
    }

    getApp() {
        return this.app;
    }

    getEnv(){
        return this.env;
    }

    getNav(navName) {
        return this.app.getNav(navName);
    }

    getAction(actionName) {
        return this.app.getAction(actionName);
    }

    getRoute(routeName) {
        return this.app.getRoute(routeName);
    }

    getView(viewName) {
        return this.app.getView(viewName);
    }

    getList(listName) {
        return this.app.getList(listName);
    }

    getFilter(filterName) {
        return this.app.getFilter(filterName);
    }

    getForm(formName) {
        return this.app.getForm(formName);
    }

    getModal(modalName) {
        return this.app.getModal(modalName);
    }

    getSdk() {
        return this.app.getSdk();
    }

    getSummary(summaryName) {
        return this.app.getSummary(summaryName);
    }

    getBreadcrumb(breadcrumbName) {
        return this.app.getBreadcrumb(breadcrumbName);
    }

    getBuilder() {
        return this.builder;
    }

    getRoutes() {
        var routes = this.app.getRoutes();
        return this._parseRoutes(routes);
    }

    getStateManager() {
        return this.stateManager;
    }

    getLanguageProvider() {
        return this.languageProvider;
    }

    _parseRoutes(routes) {
        return routes.map((route) => {
            if (route.url != '/') {
                route.url = route.url.split('/').map((routeFragment) => {
                    let routeFragmentMatch = routeFragment.match(/\{.+?\}/g);
                    if (routeFragmentMatch && routeFragmentMatch.length > 0) {
                        return ':'+routeFragmentMatch[0].slice(1,-1);
                    }
                    return routeFragment;
                }).join('/');    
            }
            var children = route.getRoutes();
            if (children.length > 0) {
                children = this._parseRoutes(children);
            }
            let routeParams = {
                path: route.url,
                name: route.name,
                children: children,
                action: route.action,
                meta: {
                  breadcrumb: route.breadcrumb
                },
                props: {view: route.view.name},
            };
            return routeParams;
        });
    }

    _initRoutes() {
        var routes = this.getRoutes();
        const includeComponents = (routes) => {
            return routes.map((route) => {
                route.component = ViewComponent;
                if (route.children) {
                    route.children = includeComponents(route.children);
                }
                if (route.action) {
                    var service = this.app.serviceManager.getService(route.action.service);
                    route.beforeEnter = service[route.action.method];
                }
                return route;
            });
        }
        routes = includeComponents(routes);
        this.options.router.addRoutes(routes);
    }

    _initProviders() {
        this.serviceRouter = new ServiceRouter(this.options.router);
        this.stateManager = new StateManager();
        this.stateManager.createScope('ssr');
        this.languageProvider = new LanguageProvider();
        this.app.serviceManager.setEventEmitter(this.vue.prototype.$eventHub);
        this.app.serviceManager.setRouter(this.serviceRouter);
        this.app.serviceManager.setCookie(Cookie);
        this.app.serviceManager.setStateManager(this.stateManager);
        this.app.serviceManager.setLanguageProvider(this.languageProvider);
    }

    _initPaths() {
        this.viewsPath = '@/views';
        this.servicesPath = '@/services';
        this.componentsPath = '@/components';
        if (this.options.config && this.options.config.resolve) {
            const resolve = this.options.config.resolve;
            if (resolve.views) {
                this.viewsPath = resolve.views;
            }
            if (resolve.services) {
                this.servicesPath = resolve.services;
            }
            if (resolve.components) {
                this.servicesPath = resolve.components;
            }
        }
    }

    _registerViews() {
        const ViewsContext = require.context(this.viewsPath, false, /\.vue$/i);
        ViewsContext.keys().forEach((key) => {
            const viewName = key.replace(/(\.\/|\.vue)/g, '');
            this.vue.component(viewName, ViewsContext(key).default);
        });
    }
    
    _registerServices() {
        const ServicesContext = require.context(this.servicesPath, false, /\.js$/i);
        ServicesContext.keys().forEach((key) => {
            const serviceName = Utils.snake2Pascal(key.replace(/(\.\/|\.js)/g, ''));
            const service = ServicesContext(key).default;
            this.app.serviceManager.registerService(serviceName, new service(this));
        });
    }

    _registerComponents() {
        const ComponentsContext = require.context(this.componentsPath, false, /\.vue$/i);
        ComponentsContext.keys().forEach((key) => {
            const componentName = key.replace(/(\.\/|\.vue)/g, '');
            const component = ComponentsContext(key).default;
            this.vue.component(componentName, component);
        });
    }

    bootstrap() {
        //this._registerViews();
        //this._registerServices();
        //this._registerComponents();
        this._initRoutes();
    }

}