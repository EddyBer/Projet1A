class Model {
    constructor() {
        this.api = new API()
        this.apiTaches = new APITaches()
    }

    async login(params) {
        let res = await this.api.login(params)
        return res
    }

    async register(params) {
        let res = await this.api.register(params)
        return res
    }

    async createTaches(params) {
        let res = await this.apiTaches.createTaches(params)
        return res
    }

    async getByDate(datedeb) {
        let res = await this.apiTaches.getTachesByDate(datedeb)
        return res
    }
}