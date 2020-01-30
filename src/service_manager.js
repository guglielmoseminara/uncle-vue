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

    setEventEmitter(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }

    getEventEmitter() {
        return this.eventEmitter;
    }

    registerService(name, service) {
        this.services[name] = service;
    }

    getService(name) {
        return this.services[name];
    }

    setActions(actions) {
        this.actions = actions;
    }

    getActions() {
        return this.actions;
    }

    setModal(modal) {
        this.modal = modal;
    }

    getModal() {
        return this.modal;
    }

    setIcons(icons) {
        this.icons = icons;
    }

    getIcons() {
        return this.icons;
    }

}