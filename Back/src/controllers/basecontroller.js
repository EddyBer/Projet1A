class BaseController {
    constructor() {
        this.setBackButtonView('connect')
        this.model = new Model()
    }

    toast(elemId) {
        const toast = new bootstrap.Toast(document.getElementById(elemId))
        toast.show()
    }

    setBackButtonView(view) {
        window.onpopstate = function() {
            navigate(view)
        }; history.pushState({}, '');
    }

    parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    formatDateISO(date) {
        let tabDate = date.split('/')

        let newDate = tabDate[2] + '-' + tabDate[1] + '-' + tabDate[0]

        return newDate
    }

    checkInput(elem) {
        let isValid = true
        
        if (!elem.value) {
            elem.focus()
            elem.className += " is-invalid"
            isValid = false
        } else if (elem.id === "email") {
            if (!this.validateEmail(email.value)) {
                elem.focus()
                elem.className += " is-invalid"
                isValid = false
            }
        } else {
            if (elem.classList.contains('is-invalid')) {
                elem.classList.remove("is-invalid");
            }
        }
        return isValid
    }

    validateEmail(email) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };
}