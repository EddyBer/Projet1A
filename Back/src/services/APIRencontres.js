class APIRencontre extends API {
    constructor() {
        super()
        this.newUrl = this.url + 'rencontre/'
    }

    async getRencontres(id) {
        let res =  await fetch(`${this.newUrl}${id}`, { method:'GET',
                                                        headers : this.header})
        return res
    }

    async createRencontre(params) {
        let res =  await fetch(`${this.newUrl}create/${params}`, { method:'POST',
                                                                   headers : this.header})
        return res
    }

    async deleteRencontre(id) {
        let res =  await fetch(`${this.newUrl}delete/${id}`, { method:'DELETE',
                                                               headers : this.header})
        return res
    }

    async updateRencontre(params) {
        let res =  await fetch(`${this.newUrl}update/${params}`, { method:'PUT',
                                                                   headers : this.header})
        return res
    }
}