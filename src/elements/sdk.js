export default class Sdk {

    async execute(api, methodObject, requestObject = null) {
        api.setMethod(methodObject);
        api.setRequest(requestObject);
        const result = await api.execute()
        return result;
    }

}