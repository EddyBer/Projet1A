class APIPartage extends API {
    constructor() {
        super()
        this.newUrl = this.url + 'partage/'
    }

    async getAll() {
        let res =  await fetch(`${this.newUrl}all`, { method:'GET'})
        return res
    }
}