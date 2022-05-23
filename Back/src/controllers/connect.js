class connectController extends BaseController {
    constructor() {
        super()
        this.refreshConnection()
        this.username = $('#email')
        this.password = $('#password')
    }

    refreshConnection() {
        if (localStorage.getItem('Token')) {
            localStorage.removeItem('Token')
        }
    }

    validForm() {
        let isValid = true

        if (!this.checkInput(this.username)) { isValid = false }
        if (!this.checkInput(this.password)) { isValid = false }

        return isValid
    }

    async login() {
        
        const params =JSON.stringify({
            mail : this.username.value,
            password : this.password.value
        })

        if (this.validForm()) {

            let logged = await this.model.login(params)

            if (logged.ok) {
                const token = await logged.json()
                localStorage.setItem('Token',token.token)
                navigate('home')
            } else {
                this.toast("error")
            }
        } else {
            this.toast("error")
        }
    }
}

window.connectController = new connectController()