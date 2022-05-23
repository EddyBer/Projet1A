class personnesController extends BaseController {
    constructor() {
        super()
        this.getPersonnes()
    }

    openModal() {
        this.myModal = new bootstrap.Modal(document.getElementById('createModal'), 'keyboard=true')
        this.myModal.show()
    }

    openModalUpdate(id,nom,prenom,date,sexe) {
        this.myModal2 = new bootstrap.Modal(document.getElementById('updateModal'), 'keyboard=true')
        let inputNom =  document.getElementById('name-update')
        let inputPrenom =  document.getElementById('firstname-update')
        let inputDate =  document.getElementById('date-update')
        let inputGenre =  document.getElementById('gender-update')
        let hiddenId =  document.getElementById('hiddenId')

        switch (sexe) {
            case "Femme" : sexe = 1; break;
            case "Homme" : sexe = 2; break;
            case "Autre" : sexe = 3; break;
        }

        hiddenId.innerHTML = id
        inputNom.value = nom
        inputPrenom.value = prenom
        inputDate.value = this.formatDateISO(date)
        inputGenre.value = sexe

        this.myModal2.show()
    }

    async updatePersonne() {
        const id = document.getElementById('hiddenId')

        let nom = $('#name-update')
        let prenom = $('#firstname-update')
        let date = $('#date-update')
        let sexe = $('#gender-update')
        let isValid = true

        if (!nom.value) {
            nom.className += " is-invalid"
            isValid = false
        }
        if (!prenom.value) {
            prenom.className += " is-invalid"
            isValid = false
        }
        if (!date.value) {
            date.className += " is-invalid"
            isValid = false
        }

        const infosUser = this.parseJwt(localStorage.getItem('Token'))

        if (isValid) {
            const params = JSON.stringify({
                id : id.innerHTML,
                user : infosUser.userId,
                nom : nom.value,
                prenom : prenom.value,
                date : date.value,
                gender : sexe.value
            })

            const updatedPersonne = await this.model.updatePersonne(params)

            if (updatedPersonne.ok) {
                this.myModal2.hide()
                navigate('personnes')
                this.toast('success')
            } else {
                this.toast("error")
            }
        }
    }

    async deletePersonne(id) {
        if (confirm("Voulez-vous vraiment supprimer cette rencontre ?")) {
            const deleted = await this.model.deletePersonne(id)
            if (deleted.ok) {
                navigate('personnes')
            }
        }
    }

    async createPersonne() {
        let nom = $('#name-personne')
        let prenom = $('#firstname-personne')
        let date = $('#date-personne')
        let sexe = $('#gender')
        let isValid = true

        if (!nom.value) {
            nom.className += " is-invalid"
            isValid = false
        }
        if (!prenom.value) {
            prenom.className += " is-invalid"
            isValid = false
        }
        if (!date.value) {
            date.className += " is-invalid"
            isValid = false
        }

        const infosUser = this.parseJwt(localStorage.getItem('Token'))

        if (isValid) {
            const params = JSON.stringify({
                user : infosUser.userId,
                nom : nom.value,
                prenom : prenom.value,
                date : date.value,
                gender : sexe.value
            })

            const newPersonne = await this.model.createPersonne(params)

            if (newPersonne.ok) {
                this.myModal.hide()
                navigate('personnes')
                this.toast('success')
            } else {
                this.toast("error")
            }
        }
    }

    async getPersonnes() {
        let content = ''
        const infosUser = this.parseJwt(localStorage.getItem('Token'))

        let listOfPersonnes = await this.model.getPersonnes(infosUser.userId)

        if (listOfPersonnes.ok) {
            const liste = await listOfPersonnes.json()
            let tbody = document.getElementById('personne')

            liste.listOfPersonnes.forEach(elem => {
                let date = new Date (elem.birthdate).toLocaleDateString()
                let gender = ""
                switch (elem.gender) {
                    case 1 : gender = "Femme"; break;
                    case 2 : gender = "Homme"; break;
                    case 3 : gender = "Autre"; break;
                }

                content += `<tr style="word-break:break-word">
                                <td>${elem.lastName}</td>
                                <td>${elem.firstName}</td>
                                <td>${date}</td>
                                <td>${gender}</td>
                                <td><i class="bi bi-trash" onclick="personnesController.deletePersonne('${elem.id}')"></i></td>
                                <td><i class="bi bi-pencil" onclick="personnesController.openModalUpdate('${elem.id}','${elem.lastName}','${elem.firstName}','${date}','${gender}')"></i></td>
                            </tr>`
            })

            tbody.innerHTML = content
        }
    }

}

window.personnesController = new personnesController()