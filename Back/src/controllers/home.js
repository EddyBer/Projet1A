class homeController extends BaseController {
    constructor() {
        super()
        let year = new Date().getFullYear()
        let month = new Date().getMonth()
        this.createCalendar(calendar, year, month)
        this.setHeaderCalendar(year,month)
    }

    openModal() {
        this.myModal = new bootstrap.Modal(document.getElementById('createModal'), 'keyboard=true')
        this.myModal.show()
    }

    openModalUpdate(id,nom,message,date,note) {
        this.myModal2 = new bootstrap.Modal(document.getElementById('updateModal'), 'keyboard=true')
        let inputNom =  document.getElementById('name-update')
        let inputDate =  document.getElementById('date-update')
        let inputMessage =  document.getElementById('message-update')
        let inputNote =  document.getElementById('note-update')
        let inputNoteDisplay =  document.getElementById('note-update-display')
        let hiddenId =  document.getElementById('hiddenId')

        hiddenId.innerHTML = id
        inputNom.value = nom
        inputMessage.value = message
        inputDate.value = this.formatDateISO(date)
        inputNote.value = note
        inputNoteDisplay.value = note

        this.myModal2.show()

    }

    getDay(date) { // get day number from 0 (monday) to 6 (sunday)
        let day = date.getDay();
        if (day == 0) day = 7; // make Sunday (0) the last day
        return day;
    }

    createCalendar(elem, year, month) {
        let currMonth = $("#month")
        let currYear = $("#year")
        currMonth.innerHTML = month
        currYear.innerHTML = year
        let mon = month;
        let d = new Date(year, mon);
  
        let table = '<table class="table table-striped table-bordered"><tr><th scope="col">Monday</th><th scope="col">Tuesday</th><th scope="col">Wednesday</th><th scope="col">Thursday</th><th scope="col">Friday</th><th scope="col">Saturday</th><th scope="col">Sunday</th></tr><tr>';

        for (let i = 1; i < this.getDay(d); i++) {
          table += '<td></td>';
        }

        while (d.getMonth() == mon) {
            table += "<td onclick=\"alert('test')\";>" + d.getDate() + '</td>';
    
            if (this.getDay(d) % 7 == 0) { // sunday, last day of week - newline
                table += '</tr><tr>';
            }
    
            d.setDate(d.getDate() + 1);
        }

        if (this.getDay(d) != 1) {
          for (let i = this.getDay(d); i < 7; i++) {
            table += '<td></td>';
          }
        }

        table += '</tr></table>';
  
        elem.innerHTML = table;
    }

    setHeaderCalendar(year,month) {
        let header = $('#headerCalendar')
        let myText = ""
        myText = this.numberToTextOfMonth(month) + " " + year

        header.innerHTML = myText
    }

    nextMonth() {
        let currMonth = parseInt($("#month").innerHTML)
        let currYear = parseInt($("#year").innerHTML)

        if (currMonth + 1 > 11) {
            currMonth = 0
            currYear += 1
        } else {
            currMonth += 1
        }

        this.createCalendar(calendar,currYear,currMonth)
        this.setHeaderCalendar(currYear,currMonth)
    }

    prevMonth() {
        let currMonth = parseInt($("#month").innerHTML)
        let currYear = parseInt($("#year").innerHTML)

        if (currMonth - 1 < 0) {
            currMonth = 11
            currYear -= 1
        } else {
            currMonth -= 1
        }

        this.createCalendar(calendar,currYear,currMonth)
        this.setHeaderCalendar(currYear,currMonth)
    }

    async deleteRencontre(id) {

        if (confirm("Voulez-vous vraiment supprimer cette rencontre ?")) {
            const deleted = await this.model.deleteRencontre(id)

            if (deleted.ok) {
                navigate('home')
            }
        }
    }

    async updateRencontre() {
        const infosUser = this.parseJwt(localStorage.getItem('Token'))
        let personneId = ""
        const id = document.getElementById('hiddenId')

        let nom =  document.getElementById('name-update')
        let date =  document.getElementById('date-update')
        let message =  document.getElementById('message-update')
        let note =  document.getElementById('note-update')
        let isValid = true

        if (!nom.value) {
            nom.className += " is-invalid"
            isValid = false
        } else {
            const listOfPersonnes = await this.model.getPersonnes(infosUser.userId)

            if (listOfPersonnes.ok) {
                const liste = await listOfPersonnes.json()
                const tab = []
                liste.listOfPersonnes.forEach(elem => {
                        tab.push([elem.lastName, elem.id])
                })

                tab.forEach (elem => {
                if (!elem[0].toUpperCase() === nom.value.toUpperCase()) {
                    nom.className += " is-invalid"
                    isValid = false
                } else {
                    personneId = elem[1]
                }
                })
            }
        }
    
        if (!date.value) {
            date.className += " is-invalid"
            isValid = false
        }
        if (message.value.length > 255) {
            message.className += " is-invalid"
            isValid = false
        }

        if (isValid) {
            const params = JSON.stringify({
                id : id.innerHTML,
                user : infosUser.userId,
                nom : nom.value,
                personneId : personneId,
                date : date.value,
                message : message.value,
                note : note.value
            })

            const updatedRencontre = await this.model.updateRencontre(params)

            if (updatedRencontre.ok) {
                this.myModal2.hide()
                navigate('home')
                this.toast('success')
            } else {
                this.toast("error")
            }
        }
    }

    async createRencontre() {
        let nom = $('#name-rencontre')
        let personneId = ""
        let date = $('#date-rencontre')
        let commentaire = $('#message-rencontre')
        let note = $('#note-rencontre')
        let isValid = true

        const infosUser = this.parseJwt(localStorage.getItem('Token'))

        if (!nom.value) {
            nom.className += " is-invalid"
            isValid = false
        } else {
            const listOfPersonnes = await this.model.getPersonnes(infosUser.userId)

            if (listOfPersonnes.ok) {
                const liste = await listOfPersonnes.json()
                const tab = []
                liste.listOfPersonnes.forEach(elem => {
                        tab.push([elem.lastName, elem.id])
                })

                tab.forEach (elem => {
                if (!elem[0].toUpperCase() === nom.value.toUpperCase()) {
                    nom.className += " is-invalid"
                    isValid = false
                } else {
                    personneId = elem[1]
                }
                })
            }
        }
        
        if (!date.value) {
            date.className += " is-invalid"
            isValid = false
        }
        if (commentaire.value.length > 255) {
            commentaire.className += " is-invalid"
            isValid = false
        }

        if (isValid) {
            const params = JSON.stringify({
                user : infosUser.userId,
                nom : nom.value,
                personneId : personneId,
                date : date.value,
                note : note.value,
                commentaire : commentaire.value
            })

            const newRencontres = await this.model.createRencontre(params)

            if (newRencontres.ok) {
                this.myModal.hide()
                navigate('home')
                this.toast('success')
            } else {
                this.toast("error")
            }
        }
    }
}

window.homeController = new homeController()