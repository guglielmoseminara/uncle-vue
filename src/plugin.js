import { Loader } from '../index';

export default {
    install(Vue, options) {
        var loader = new Loader();
        loader.init();
        const app = loader.getParser().getApp(options.app);
        Vue.prototype.$uncle = function() {
            return {
                getNav: function(navName) {
                    return app.getNav(navName);
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
                getSdk: function() {
                    return app.getSdk();
                },
                getSummary: function(summaryName) {
                    return app.getSummary(summaryName);
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
                        return {
                            path: route.url,
                            name: route.name,
                            children: children,
                            props: {view: route.view.name}
                        }
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