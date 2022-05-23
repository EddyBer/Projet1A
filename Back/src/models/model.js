class Model {
    constructor() {
        this.api = new API()
        this.apiPersonne = new APIPersonne()
        this.apiRencontre = new APIRencontre()
        this.apiPartage = new APIPartage()
    }

    async login(params) {
        let res = await this.api.login(params)
        return res
    }

    async register(params) {
        let res = await this.api.register(params)
        return res
    }

    async getRencontres(id) {
        let res = await this.apiRencontre.getRencontres(id)
        return res
    }

    async createRencontre(params) {
        let res = await this.apiRencontre.createRencontre(params)
        return res
    }

    async deleteRencontre(id) {
        let res = await this.apiRencontre.deleteRencontre(id)
        return res
    }

    async updateRencontre(params) {
        let res = await this.apiRencontre.updateRencontre(params)
        return res
    }

    async getPersonnes(id) {
        let res = await this.apiPersonne.getPersonnes(id)
        return res
    }

    async createPersonne(params) {
        let res = await this.apiPersonne.createPersonne(params)
        return res
    }

    async deletePersonne(id) {
        let res = await this.apiPersonne.deletePersonne(id)
        return res
    }

    async updatePersonne(params) {
        let res = await this.apiPersonne.updatePersonne(params)
        return res
    }

    async getPartages() {
        let res = await this.apiPartage.getAll()
        return res
    }
}