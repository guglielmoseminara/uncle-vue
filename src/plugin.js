import { Loader, ServiceRouter, Cookie} from './index';

export default {
    install(Vue, options) {
        var loader = new Loader();
        loader.init();
        const app = loader.getParser().getApp(options.app);
        const serviceRouter = new ServiceRouter(options.router);
        app.serviceManager.setRouter(serviceRouter);
        app.serviceManager.setCookie(Cookie);
        Vue.prototype.$uncle = function() {
            return {
                getApp: function() {
                    return app;
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
                }
            }
        }();
    }
}