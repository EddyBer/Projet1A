class homeController extends BaseController {
    constructor() {
        super()
        let year = new Date().getFullYear()
        let month = new Date().getMonth()
        let next = $('#next')
        let prev = $('#prev')
        next.setAttribute('onclick',"homeController.nextMonth()")
        prev.setAttribute('onclick',"homeController.prevMonth()")
        this.createCalendar(calendar, year, month)
        this.setHeaderCalendar(year,month)
    }

    openModal() {
        let modalFooter = $('.modal-footer')
        let div_ad      = $('#ad')
        let nom         = $('#name-tache')
        nom.value       = ""
        let datedeb     = $('#date-debut')
        datedeb.value   = ""
        div_ad.style.display = 'none'

        modalFooter.innerHTML =  '<button type=\"button\" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'
        modalFooter.innerHTML += '<button id="validButton"type="button" class="btn btn-primary" onclick="homeController.createTask()">Add task</button>'
        this.myModal = new bootstrap.Modal(document.getElementById('createModal'), 'keyboard=true')

        this.myModal.show()
    }

    async openModalUpdate(id) {
        let nom         = $('#name-tache')
        let datedeb     = $('#date-debut')
        let heuredeb    = $('#heure-debut')
        let datefin     = $('#date-fin')
        let heurefin    = $('#heure-fin')
        let avancement  = $('#avancement-tache')
        let output_adv  = $('#output_adv')
        let div_ad      = $('#ad')
        let today       = new Date()
        

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
            output_adv.value = task.taches.avancement
        } else {
            this.toast("error")
        }

        let dateToCompare = new Date(task.taches.datedeb)
        if (dateToCompare.getTime() < today.getTime()) {
            div_ad.style.display = ''
        } else {
            div_ad.style.display = 'none'
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
                html = ""
                let infosUser = this.parseJwt(localStorage.getItem('Token'))
                
                let params = JSON.stringify({
                    user       : infosUser.userId,
                    date       : this.formatDate(d)
                })
                let task = await this.model.getByDate(params)
                if (task.ok) {
                    task = await task.json()
                    if (task.taches[0].length > 0) {
                        task.taches[0].forEach(elem => {
                            html += `<span id=\"${elem.id}\" class=\"badge bg-success\" onclick=\"homeController.openModalUpdate('${elem.id}')\">${elem.libelle}</span>`
                            onclick = ``
                        });
                    } else {
                        html = ""
                        onclick = `homeController.openModal()`
                    }
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

    async createCalendarWeek(elem, year, month,date) {
        let currMonth = $("#month")
        let currYear = $("#year")
        currMonth.innerHTML = month
        currYear.innerHTML = year
        let first = 0
        let mon = month;
        let d = new Date(year, mon,date);

        if (d.getDate() != 1) {
            first = (d.getDate() - d.getDay()) + 1
        } else {
            first = d.getDate()
        }

        let firstday = new Date(d.setDate(first))
        let lastday = new Date(d.setDate(first))

        for (let i = this.getDay(firstday); i < 7 ; i++) {
            lastday.setDate(lastday.getDate() + 1)
        }
        
        let html = ""
        let onclick = ""
        let table = '<table class="table table-striped table-bordered"><tr><th scope="col">Monday</th><th scope="col">Tuesday</th><th scope="col">Wednesday</th><th scope="col">Thursday</th><th scope="col">Friday</th><th scope="col">Saturday</th><th scope="col">Sunday</th></tr><tr>';

        for (let i = 1; i < this.getDay(firstday); i++) {
          table += '<td></td>';
        }

        for (let i = this.getDay(firstday); i <= this.getDay(lastday); i++) {
            if (this.getDay(firstday) == 6 || this.getDay(firstday) == 7) {
                table += "<td class=\"day weekend\">" + firstday.getDate() + '</td>';
            } else {
                html = ""
                let infosUser = this.parseJwt(localStorage.getItem('Token'))

                let params = JSON.stringify({
                    user       : infosUser.userId,
                    date       : this.formatDate(firstday)
                })
                let task = await this.model.getByDate(params)
                if (task.ok) {
                    task = await task.json()
                    if (task.taches[0].length > 0) {
                        task.taches[0].forEach(elem => {
                            html += `<span id=\"${elem.id}\" class=\"badge bg-success\" onclick=\"homeController.openModalUpdate('${elem.id}')\">${elem.libelle}</span>`
                            onclick = ``
                        });
                    } else {
                        html    = ""
                        onclick = ""
                    }
                }
                table += `<td class=\"day week\" onclick=\"${onclick}\";>` + firstday.getDate() + html + '</td>';
            }
            firstday.setDate(firstday.getDate() + 1);
        }

        table += '</tr></table>';
  
        elem.innerHTML = table;
    }

    async createCalendarDay(elem, date) {
        let currMonth = $("#month")
        let currYear = $("#year")
        let currDate = $("#date")
        currMonth.innerHTML = date.getMonth()
        currYear.innerHTML = date.getFullYear()
        currDate.innerHTML = date

        let d = new Date(date);

        let html = ""
        let onclick = ""
        let table = '<table class="table table-striped table-bordered"><tr>'

        switch (this.getDay(d)) {
            case 1:
                table += '<th scope="col">Monday</th></tr><tr>' ;
                break;
            case 2:
                table += '<th scope="col">Tuesday</th></tr><tr>';
                break;
            case 3:
                table += '<th scope="col">Wednesday</th></tr><tr>';
                break;
            case 4:
                table += '<th scope="col">Thursday</th></tr><tr>';
                break;
            case 5:
                table += '<th scope="col">Friday</th></tr><tr>';
                break;
            case 6:
                table += '<th scope="col">Saturday</th></tr><tr>';
                break;
            case 7:
                table += '<th scope="col">Sunday</th></tr><tr>';
                break;
        }

        if (this.getDay(d) == 6 || this.getDay(d) == 7) {
            table += "<td class=\"day weekend\">" + d.getDate() + '</td>';
        } else {

            let infosUser = this.parseJwt(localStorage.getItem('Token'))

                let params = JSON.stringify({
                    user       : infosUser.userId,
                    date       : this.formatDate(d)
                })
                let task = await this.model.getByDate(params)
            if (task.ok) {
                task = await task.json()
                if (task.taches[0].length > 0) {
                    task.taches[0].forEach(elem => {
                        html += `<span id=\"${elem.id}\" class=\"badge bg-success\" onclick=\"homeController.openModalUpdate('${elem.id}')\">${elem.libelle}</span>`
                        onclick = ``
                    });
                } else {
                    html    = ""
                    onclick = ""
                }
            }

            table += `<td class=\"day week\" onclick=\"${onclick}\";>` + d.getDate() + html + '</td>';
        }

        table += '</tr></table>';
  
        elem.innerHTML = table;
    }

    nextDay() {
        let currDate = new Date($("#date").innerHTML)

        currDate.setDate(currDate.getDate() + 1);

        this.createCalendarDay(calendar,currDate)
        this.setHeaderCalendar(currDate.getFullYear(),currDate.getMonth())
    }

    prevDay() {
        let currDate = new Date($("#date").innerHTML)

        currDate.setDate(currDate.getDate() - 1);

        this.createCalendarDay(calendar,currDate)
        this.setHeaderCalendar(currDate.getFullYear(),currDate.getMonth())
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

    nextWeek() {
        let currMonth = parseInt($("#month").innerHTML)
        let currYear = parseInt($("#year").innerHTML)
        let startWeek = parseInt($("#month").innerHTML)
        let endWeek = parseInt($("#year").innerHTML)


        this.createCalendarWeek(calendar,currYear,currMonth,startWeek)
        this.setHeaderCalendar(currYear,currMonth)
    }

    prevWeek() {
        let currMonth = parseInt($("#month").innerHTML)
        let currYear = parseInt($("#year").innerHTML)
        let startWeek = parseInt($("#month").innerHTML)
        let endWeek = parseInt($("#year").innerHTML)


        this.createCalendarWeek(calendar,currYear,currMonth,startWeek)
        this.setHeaderCalendar(currYear,currMonth)
    }

    setDisplay() {
        let display = $('#display')
        let year    = new Date().getFullYear()
        let month   = new Date().getMonth()
        let day     = new Date().getDate()
        let next = $('#next')
        let prev = $('#prev')

        switch (display.value) {
            case 'M':
                this.createCalendar(calendar, year, month)
                next.setAttribute('onclick',"homeController.nextMonth()")
                prev.setAttribute('onclick',"homeController.prevMonth()")
                this.setHeaderCalendar(year,month)
                break
            case 'W':
                this.createCalendarWeek(calendar, year, month,day)
                next.setAttribute('onclick',"homeController.nextWeek()")
                prev.setAttribute('onclick',"homeController.prevWeek()")
                break
            case 'D':
                this.createCalendarDay(calendar, new Date())
                next.setAttribute('onclick',"homeController.nextDay()")
                prev.setAttribute('onclick',"homeController.prevDay()")
                break
        }
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
        const infosUser = this.parseJwt(localStorage.getItem('Token'))
        let nom         = $('#name-tache')
        let datedeb     = $('#date-debut')
        let heuredeb    = $('#heure-debut')
        let datefin     = $('#date-fin')
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
        } else if(datedeb.value) {
            let dateTmp = new Date(datedeb.value)
            dateTmp = dateTmp.getDay()

            if (dateTmp == 0 || dateTmp == 6) {
                datedeb.className += " is-invalid"
                isValid = false
            }
        }

        if (!datefin.value) {
            datefin = datedeb.value
        } else {

            if (datedeb.value > datefin.value) {
                datefin.className += " is-invalid"
                isValid = false
            }
            let dateTmp = new Date(datefin.value)
            dateTmp = dateTmp.getDay()

            if (dateTmp == 0 || dateTmp == 6) {
                datefin.className += " is-invalid"
                isValid = false
            } else {
                datefin = datefin.value
            }
        }

        if (isValid) {
            const params = JSON.stringify({
                id         : id,
                user       : infosUser.userId,
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
                this.toast("error", "Mise ?? jour impossible")
            }
        }
    }

    async createTask() {
        const infosUser = this.parseJwt(localStorage.getItem('Token'))
        let nom         = $('#name-tache')
        let datedeb     = $('#date-debut')
        let heuredeb    = $('#heure-debut')
        let datefin     = $('#date-fin')
        let heurefin    = $('#heure-fin')
        let avancement  = $('#avancement-tache')
        let isValid     = true

        if (!nom.value) {
            nom.className += " is-invalid"
            isValid = false
        } else {
            nom.classList.remove('is-invalid')
        }
        
        if (!datedeb.value) {
            datedeb.className += " is-invalid"
            isValid = false
        } else if(datedeb.value) {
            let dateTmp = new Date(datedeb.value)
            dateTmp = dateTmp.getDay()

            if (dateTmp == 0 || dateTmp == 6) {
                datedeb.className += " is-invalid"
                isValid = false
            }
        }

        if (!datefin.value) {
            datefin = datedeb.value
        } else {
            if (datedeb.value > datefin.value) {
                datefin.className += " is-invalid"
                isValid = false
            }
            let dateTmp = new Date(datefin.value)
            dateTmp = dateTmp.getDay()

            if (dateTmp == 0 || dateTmp == 6) {
                datefin.className += " is-invalid"
                isValid = false
            } else {
                datefin = datefin.value
            }
        }

        if (isValid) {

            const params = JSON.stringify({
                user       : infosUser.userId,
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
                this.toast("error","Creation Failed")
            }
        }
    }
}

window.homeController = new homeController()