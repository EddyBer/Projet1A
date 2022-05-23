class API {
    constructor() {
        this.url = 'http://localhost:5500/'
        this.header = new Headers({'Authorization': localStorage.getItem('Token')})
    }

    async login(params) {
        let res = await fetch(`${this.url}login/${params}`, { method:'POST'})
        return res
    }

    async register(params) {
        let res =  await fetch(`${this.url}register/${params}`, { method:'POST'})
        return res
    }
}
