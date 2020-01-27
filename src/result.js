export default class Result {

    constructor(results) {
        this._resultObj = results;
    }

    getData() {
        return this._resultObj.data;
    }

    getTotal() {
        return this._resultObj.pagination ? this._resultObj.pagination.total : -1;
    }

    get() {
        return this._resultObj;
    }

}