class creationController extends BaseController {
    constructor() {
        super()
        this.setBackButtonView('connect')
        this.name = $('#name')
        this.firstName = $('#firstname')
        this.mail = $('#email')
        this.password = $('#password')
        this.confirmPassword = $('#confirmPassword')
    }

    validForm() {
        let isValid = true

        if (!this.checkInput(this.name)) { isValid = false }
        if (!this.checkInput(this.firstName)) { isValid = false }
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
                name : this.name.value,
                firstName : this.firstName.value,
                mail: this.mail.value,
                password : this.password.value,
                confirmPassword : this.confirmPassword.value
                })

            const newUser = await this.model.register(params)

            if (newUser.ok) {
                setTimeout(this.toast("success"),2000)
                //this.toast("success")
                clearTimeout();
                navigate('connect')
            } else {
                this.toast("error","Mail adress already used")
            }
        } else {
            this.toast("error")
        }
    }

}

window.creationController = new creationController()