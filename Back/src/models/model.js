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
        let res = await this.apiTaches.createTask(params)
        return res
    }

    async deleteTask(id) {
        let res = await this.apiTaches.deleteTask(id)
        return res
    }

    async updateTask(id) {
        let res = await this.apiTaches.updateTask(id)
        return res
    }

    async getByDate(params) {
        let res = await this.apiTaches.getTachesByDate(params)
        return res
    }

    async getById(id) {
        let res = await this.apiTaches.getById(id)
        return res
    }

    async getAll() {
        let res = await this.apiTaches.getAll()
        return res
    }

    async getCurrent() {
        let res = await this.apiTaches.getCurrent()
        return res
    }

    async getComing() {
        let res = await this.apiTaches.getComing()
        return res
    }

    async getPast() {
        let res = await this.apiTaches.getPast()
        return res
    }
}