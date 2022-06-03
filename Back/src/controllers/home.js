class homeController extends BaseController {
    constructor() {
        super()
        let year = new Date().getFullYear()
        let month = new Date().getMonth()
        this.createCalendar(calendar, year, month)
        this.setHeaderCalendar(year,month)
    }

    openModal() {
        let modalFooter = $('.modal-footer')
        modalFooter.innerHTML =  '<button type=\"button\" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'
        modalFooter.innerHTML += '<button id="validButton"type="button" class="btn btn-primary" onclick="homeController.createTask()">Add task</button>'
        this.myModal = new bootstrap.Modal(document.getElementById('createModal'), 'keyboard=true')

        this.myModal.show()
    }

    async openModalUpdate(id) {
        let nom         = $('#name-tache')
        let datedeb     = $('#date-debut')
        let heuredeb    = $('#heure-debut')
        let datefin     = $('#date-debut')
        let heurefin    = $('#heure-fin')
        let avancement  = $('#avancement-tache')

        let modalFooter = $('.modal-footer')
        modalFooter.innerHTML =  '<button type=\"button\" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'
        modalFooter.innerHTML += `<button id="validButton"type="button" class="btn btn-primary" onclick="homeController.updateTask('${id}')">Update task</button>`
        modalFooter.innerHTML += `<button id="validButton"type="button" class="btn btn-primary" onclick=" if(confirm('Are you sure ?')) homeController.deleteTask('${id}')">Delete task</button>`

        this.myModal = new bootstrap.Modal(document.getElementById('createModal'), 'keyboard=true')
        let task = await this.model.getById(id)

        if (task.ok) {
            task = await task.json()
            nom.value        = task.taches.libelle 
            datedeb.value    = task.taches.datedeb 
            heuredeb.value   = task.taches.heuredeb 
            datefin.value    = task.taches.datefin 
            heurefin.value   = task.taches.heurefin 
            avancement.value = task.taches.avancement 
        } else {
            this.toast("error")
        }
        this.myModal.show()

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
        let onclick = ""
        let table = '<table class="table table-striped table-bordered"><tr><th scope="col">Monday</th><th scope="col">Tuesday</th><th scope="col">Wednesday</th><th scope="col">Thursday</th><th scope="col">Friday</th><th scope="col">Saturday</th><th scope="col">Sunday</th></tr><tr>';

        for (let i = 1; i < this.getDay(d); i++) {
          table += '<td></td>';
        }

        while (d.getMonth() == mon) {
            if (this.getDay(d) == 6 || this.getDay(d) == 7) {
                table += "<td class=\"day weekend\">" + d.getDate() + '</td>';
            } else {
                let task = await this.model.getByDate(this.formatDate(d))
                if (task.ok) {
                    task = await task.json()
                    html = `<span id=\"${task.taches.id}\" class=\"badge bg-success\">${task.taches.libelle}</span>`
                    onclick = `homeController.openModalUpdate('${task.taches.id}')`
                } else {
                    html = ""
                    onclick = ""
                }

                table += `<td class=\"day week\" onclick=\"${onclick}\";>` + d.getDate() + html + '</td>';
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
        const task = await this.model.deleteTask(id)

        if (task.ok) {
            this.myModal.hide()
            navigate('home')
            this.toast('success')
        } else {
            this.toast("error")
        }
    }

    async updateTask(id) {
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
                id         : id,
                libelle    : nom.value,
                datedeb    : datedeb.value,
                heuredeb   : heuredeb.value,
                datefin    : datefin,
                heurefin   : heurefin.value,
                avancement : avancement.value
            })

            const newTask = await this.model.updateTask(params)

            if (newTask.ok) {
                this.myModal.hide()
                navigate('home')
                this.toast('success')
            } else {
                this.toast("error")
            }
        }
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