export default class Result {

    constructor(results) {
        this._resultObj = results;
    }

    getData() {
        return this._resultObj.data;
    }

    getTotal() {
        console.log(this._resultObj);
        return this._resultObj.pagination.total;
    }

}