export default class ServiceManager {

    constructor() {
        this.services = {};
    }

    setRouter(router) {
        this.router = router;
    }

    getRouter() {
        return this.router;
    }

    setNotifier(notifier) {
        this.notifier = notifier;
    }

    getNotifier() {
        return this.notifier;
    }

    setCookie(cookie) {
        this.cookie = cookie;
    }

    getCookie() {
        return this.cookie;
    }

    registerService(name, service) {
        this.services[name] = service;
    }

    getService(name) {
        return this.services[name];
    }

}