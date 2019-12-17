export default class ServiceRouter {

    constructor(router) {
        this.router = router;
    }

    navigate(name, params) {
        if (this.router.currentRoute.path !== params.path) {
            this.router.push({ name: name, params: params });
        } else {
            this.router.go();
        }
    }

}