class creationController extends BaseController {
    constructor() {
        super()
        this.setBackButtonView('connect')
        this.username = $('#username')
        this.name = $('#name')
        this.firstName = $('#firstname')
        this.date = $('#age')
        this.gender = $('#gender')
        this.mail = $('#email')
        this.password = $('#password')
        this.confirmPassword = $('#confirmPassword')
    }

    validForm() {
        let isValid = true

        if (!this.checkInput(this.username)) { isValid = false }
        if (!this.checkInput(this.date)) { isValid = false }
        if (!this.checkInput(this.mail)) { 
            isValid = false 
        } else { 
            if (!this.validateEmail(this.mail.value)) {
                isValid = false
            }
        }
        if (!this.checkInput(this.password)) { isValid = false }
        if (!this.checkInput(this.confirmPassword)) { isValid = false }
        if (this.password.value !== this.confirmPassword.value) { isValid = false }

        return isValid
    }

    async register() {

        if (this.validForm()) {

            const params = JSON.stringify({
                username : this.username.value,
                name : this.name.value,
                firstName : this.firstName.value,
                age : this.date.value,
                gender : this.gender.value,
                mail: this.mail.value,
                password : this.password.value,
                confirmPassword : this.confirmPassword.value
                })

            const newUser = await this.model.register(params)
            
            if (newUser.ok) {
                this.toast("success")
                navigate('connect')
            }
        } else {
            this.toast("error")
        }
    }

}

window.creationController = new creationController()