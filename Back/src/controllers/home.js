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

    async createCalendar(elem, year, month) {
        let currMonth = $("#month")
        let currYear = $("#year")
        currMonth.innerHTML = month
        currYear.innerHTML = year
        let mon = month;
        let d = new Date(year, mon);
        let html = ""
        let table = '<table class="table table-striped table-bordered"><tr><th scope="col">Monday</th><th scope="col">Tuesday</th><th scope="col">Wednesday</th><th scope="col">Thursday</th><th scope="col">Friday</th><th scope="col">Saturday</th><th scope="col">Sunday</th></tr><tr>';

        for (let i = 1; i < this.getDay(d); i++) {
          table += '<td></td>';
        }

        while (d.getMonth() == mon) {
            if (this.getDay(d) == 6 || this.getDay(d) == 7) {
                table += "<td class=\"day weekend\">" + d.getDate() + '</td>';
            } else {
                let task = await this.model.getByDate(this.formatDate(d))
                //console.log(task)
                if (task.ok) {
                    html = `<span class=\"badge badge-primary\">Primary</span>`
                } else {
                    html = ""
                }

                table += "<td class=\"day week\" onclick=\"alert('test')\";>" + d.getDate() + html + '</td>';
            }

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

    async deleteTask(id) {
    }

    async updateTask() {
    }

    async createTask() {
        let nom         = $('#name-tache')
        let datedeb     = $('#date-debut')
        let heuredeb    = $('#heure-debut')
        let datefin     = $('#date-debut')
        let heurefin    = $('#heure-fin')
        let avancement  = $('#avancement-tache')
        let repeat      = 0
        let isValid     = true

        if (!nom.value) {
            nom.className += " is-invalid"
            isValid = false
        }
        
        if (!datedeb.value) {
            datedeb.className += " is-invalid"
            isValid = false
        }

        if (!datefin.value) {
            datefin = datedeb.value
        } else {
            datefin = datefin.value
        }

        if (isValid) {
            const params = JSON.stringify({
                libelle    : nom.value,
                datedeb    : datedeb.value,
                heuredeb   : heuredeb.value,
                datefin    : datefin,
                heurefin   : heurefin.value,
                avancement : avancement.value
            })

            const newTask = await this.model.createTaches(params)

            if (newTask.ok) {
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