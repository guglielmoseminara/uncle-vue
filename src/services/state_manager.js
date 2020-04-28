class PubSub {
    
    constructor() {
        this.events = {};
    }

    subscribe(event, callback) {
        if(!this.events.hasOwnProperty(event)) {
          this.events[event] = [];
        }
        return this.events[event].push(callback);
    }

    publish(event, data = {}) {
        if(!this.events.hasOwnProperty(event)) {
          return [];
        }
        return this.events[event].map(callback => callback(data));
    }
}

export default class StateManager {

    constructor() {
        this._events = new PubSub(); 
        this._state = this.createState();
        this._scopedStates = {};
        this._scopedEvents = {};
    }

    createScope(scopeId) {
        this._scopedStates[scopeId] = this.createState(scopeId);
        this._scopedEvents[scopeId] = new PubSub();
    }

    createState(scopeId) {
        return new Proxy({}, {
            set: function(state, key, value) {
                state[key] = value;
                if (scopeId) {
                    var data = {};
                    data[key]  = value;
                    this._scopedEvents[scopeId].publish('stateChange', data);
                    this._scopedEvents[scopeId].publish(`stateChange:${key}`, value);    
                } else {
                    this._events.publish('stateChange', this._state);
                    this._events.publish(`stateChange:${key}`, value);    
                }
                return true;
            }.bind(this),
            get: function(state, key) {
                return state[key];
            }
        });
    }

    set(key, value) {
        this._state[key] = value;
    }

    setScoped(scopeId, key, value) {
        if (this._scopedStates[scopeId]) {
            this._scopedStates[scopeId][key] = value;
        }
    }

    get(key, value) {
        return this._state[key];
    }

    getScoped(scopeId, key) {
        if (this._scopedStates[scopeId]) {
            return this._scopedStates[scopeId][key];
        }
    }

    subscribe(callback) {
        this._events.subscribe('stateChange', callback);
    }

    subscribeKey(key, callback) {
        this._events.subscribe(`stateChange:${key}`, callback);
    }

    subscribeScope(scopeId, callback) {
        if (this._scopedEvents[scopeId]) {
            this._scopedEvents[scopeId].subscribe('stateChange', callback);
        }
    }

    subscribeScopedKey(scopeId, key, callback) {
        if (this._scopedEvents[scopeId]) {
            this._scopedEvents[scopeId].subscribe(`stateChange:${key}`, callback);
        }
    }

}