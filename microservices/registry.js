

class Registry {
    constructor() {
        this.services = [];
        console.log("REGISTRY SERVICE STARTED ...")
    }

    registerService(operation, host, port) {
        this.clearDeadServices();
        const service = {
            operation,
            host,
            port,
            timestamp: (new Date() / 1000)
        }
        let serviceKey = operation + host + port;
        this.services[serviceKey] = service;
        console.log(`[REGEISTRY]: microservice registered ${serviceKey}`);
    }

    updateServiceInRegister(operation, host, port) {
        this.clearDeadServices();
        let serviceKey = operation + host + port;
        this.services[serviceKey].timestamp = (new Date() / 1000);
        console.log(`[REGEISTRY]: microservice updated registry presence ${serviceKey}`);
    }

    getService(operation) {
        this.clearDeadServices();
        for (let key in this.services) {
            if (key.startsWith(operation)) {
                return this.services[key];
            }
        }
        return null;
    }

    clearDeadServices() {
        for (let key in this.services) {
            if ((new Date() / 1000) - this.services[key].timestamp >= 12) {
                delete this.services[key];
                console.log(`[REGEISTRY]: microservice expired ${key}`);
            }
        }
    }
}

module.exports = new Registry();