class APIPersonne extends API {
    constructor() {
        super()
        this.newUrl = this.url + 'personne/'
    }

    async getPersonnes(id) {
        let res =  await fetch(`${this.newUrl}${id}`, { method:'GET',
                                                        headers : this.header})
        return res
    }

    async createPersonne(params) {
        let res =  await fetch(`${this.newUrl}create/${params}`, { method:'POST',
                                                                   headers : this.header})
        return res
    }

    async deletePersonne(id) {
        let res =  await fetch(`${this.newUrl}delete/${id}`, { method:'DELETE',
                                                               headers : this.header})
        return res
    }

    async updatePersonne(params) {
        let res =  await fetch(`${this.newUrl}update/${params}`, { method:'PUT',
                                                                   headers : this.header})
        return res
    }
}