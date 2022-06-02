class APITaches extends API {
    constructor() {
        super()
        this.newUrl = this.url + 'taches/'
    }

    async getTaches(id) {
        let res =  await fetch(`${this.newUrl}${id}`, { method:'GET',
                                                        headers : this.header})
        return res
    }

    async getTachesByDate(datedeb) {
        let res =  await fetch(`${this.newUrl}${datedeb}`, { method:'GET',
                                                        headers : this.header})
        return res
    }

    async createTaches(params) {
        let res =  await fetch(`${this.newUrl}create/${params}`, { method:'POST',
                                                                   headers : this.header})
        return res
    }

    async deleteTaches(id) {
        let res =  await fetch(`${this.newUrl}delete/${id}`, { method:'DELETE',
                                                               headers : this.header})
        return res
    }

    async updateTaches(params) {
        let res =  await fetch(`${this.newUrl}update/${params}`, { method:'PUT',
                                                                   headers : this.header})
        return res
    }
}
