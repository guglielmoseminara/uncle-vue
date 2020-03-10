import { Loader, ServiceRouter, Cookie, StateManager, LanguageProvider, Utils } from './index';
import { ViewComponent } from './components';

export default {
    install(Vue, options) {
        var loader = new Loader();
        loader.init();
        const parser = loader.getParser();
        const app = parser.getApp(options.app);
        const env = parser.getEnv();
        const serviceRouter = new ServiceRouter(options.router);
        const stateManager = new StateManager();
        const languageProvider = new LanguageProvider();
        app.serviceManager.setRouter(serviceRouter);
        app.serviceManager.setCookie(Cookie);
        app.serviceManager.setStateManager(stateManager);
        app.serviceManager.setLanguageProvider(languageProvider);
        Vue.prototype.$stateManager = stateManager;
        Vue.prototype.$languageProvider = languageProvider;
        const uncle = function() {
            return {
                getApp: function() {
                    return app;
                },
                getEnv: function() {
                    return env;
                },
                getNav: function(navName) {
                    return app.getNav(navName);
                },
                getAction: function(actionName) {
                    return app.getAction(actionName);
                },
                getView: function(viewName) {
                    return app.getView(viewName);
                },
                getList: function(listName) {
                    return app.getList(listName);
                },
                getFilter: function(filterName) {
                    return app.getFilter(filterName);
                },
                getForm: function(formName) {
                    return app.getForm(formName);
                },
                getModal: function(modalName) {
                    return app.getModal(modalName);
                },
                getSdk: function() {
                    return app.getSdk();
                },
                getSummary: function(summaryName) {
                    return app.getSummary(summaryName);
                },
                getBreadcrumb: function(breadcrumbName) {
                    return app.getBreadcrumb(breadcrumbName);
                },
                getBuilder: function() {
                    return app.getBuilder();
                },
                _parseRoutes: function(routes) {
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
                },
                getRoutes: function() {
                    var routes = app.getRoutes();
                    return this._parseRoutes(routes);
                },
                initRoutes: function() {
                    var routes = this.getRoutes();
                    const includeComponents = (routes) => {
                        return routes.map((route) => {
                            route.component = ViewComponent;
                            if (route.children) {
                                route.children = includeComponents(route.children);
                            }
                            if (route.action) {
                                var service = app.serviceManager.getService(route.action.service);
                                route.beforeEnter = service[route.action.method];
                            }
                            return route;
                        });
                    }
                    routes = includeComponents(routes);
                    options.router.addRoutes(routes);
                },
                registerViews() {
                    const ViewsContext = require.context('@/views', false, /\.vue$/i);
                    ViewsContext.keys().forEach((key) => {
                        const viewName = key.replace(/(\.\/|\.vue)/g, '');
                        Vue.component(viewName, ViewsContext(key).default);
                    });
                },
                registerServices() {
                    const app = this.getApp();
                    const ServicesContext = require.context('@/services', false, /\.js$/i);
                    ServicesContext.keys().forEach((key) => {
                        const serviceName = Utils.snake2Pascal(key.replace(/(\.\/|\.js)/g, ''));
                        const service = ServicesContext(key).default;
                        app.serviceManager.registerService(serviceName, new service(uncle));
                    });
                },
                registerComponents() {
                    const ComponentsContext = require.context('@/components', false, /\.vue$/i);
                    ComponentsContext.keys().forEach((key) => {
                        const componentName = key.replace(/(\.\/|\.vue)/g, '');
                        const component = ComponentsContext(key).default;
                        Vue.component(componentName, component);
                    });
                },
                bootstrap: function() {
                    this.registerViews();
                    this.registerServices();
                    this.registerComponents();
                    this.initRoutes();
                }
            }
        }();
        Vue.prototype.$uncle = uncle;
    }
}