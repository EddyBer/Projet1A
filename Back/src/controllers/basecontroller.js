class BaseController {
    constructor() {
        this.setBackButtonView('connect')
        this.model = new Model()
    }

    toast(elemId, text ="") {
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

    formatDate(date) {
        let formatted_date =  date.getFullYear() + '-' +  (date.getMonth() + 1) + "-" + date.getDate()
        return formatted_date.toString();
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

    numberToTextOfMonth(month) {
        let myText =""
        switch(month) {
            case 0:
                myText += "January"
                break;
            case 1:
                myText += "February"
                break;
            case 2:
                myText += "March"
                break;
            case 3:
                myText += "April"
                break;
            case 4:
                myText += "Mai"
                break;
            case 5:
                myText += "June"
                break;
            case 6:
                myText += "July"
                break;
            case 7:
                myText += "August"
                break;
            case 8:
                myText += "September"
                break;
            case 9:
                myText += "October"
                break;
            case 10:
                myText += "November"
                break;
            case 11:
                myText += "December"
                break;
        }
        return myText
    }

    validateEmail(email) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };
}