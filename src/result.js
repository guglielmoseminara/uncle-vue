export default class Result {

    constructor(results) {
        this._resultObj = results;
    }

    getData() {
        return this._resultObj.data;
    }

    getTotal() {
        return this._resultObj.pagination.total;
    }

    get() {
        return this._resultObj;
    }

}