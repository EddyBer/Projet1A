class APITaches extends API {
    constructor() {
        super()
        this.newUrl = this.url + 'taches/'
    }

    async getAll() {
        let res =  await fetch(`${this.newUrl}list/all`, { method:'GET',
                                                        headers : this.header})
        return res
    }

    async getCurrent() {
        let res =  await fetch(`${this.newUrl}list/current`, { method:'GET',
                                                        headers : this.header})
        return res
    }

    async getComing() {
        let res =  await fetch(`${this.newUrl}list/coming`, { method:'GET',
                                                        headers : this.header})
        return res
    }

    async getPast() {
        let res =  await fetch(`${this.newUrl}list/past`, { method:'GET',
                                                        headers : this.header})
        return res
    }   

    async getById(id) {
        let res =  await fetch(`${this.newUrl}infos/${id}`, { method:'GET',
                                                        headers : this.header})
        return res
    }

    async getTachesByDate(datedeb) {
        let res =  await fetch(`${this.newUrl}${datedeb}`, { method:'GET',
                                                        headers : this.header})
        return res
    }

    async createTask(params) {
        let res =  await fetch(`${this.newUrl}create/${params}`, { method:'POST',
                                                                   headers : this.header})
        return res
    }

    async deleteTask(id) {
        let res =  await fetch(`${this.newUrl}delete/${id}`, { method:'DELETE',
                                                               headers : this.header})
        return res
    }

    async updateTask(params) {
        let res =  await fetch(`${this.newUrl}update/${params}`, { method:'PUT',
                                                                   headers : this.header})
        return res
    }
}
