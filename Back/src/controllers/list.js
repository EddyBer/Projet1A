class listController extends BaseController {
    constructor() {
        super()
        this.displayAll()
    }

    
    async getDetails(id) {
        let nom         = $('#name-tache')
        let datedeb     = $('#date-debut')
        let heuredeb    = $('#heure-debut')
        let datefin     = $('#date-debut')
        let heurefin    = $('#heure-fin')
        let avancement  = $('#avancement-tache')
        let output_adv  = $('#output_adv')

        let modalFooter = $('.modal-footer')
        modalFooter.innerHTML =  '<button type=\"button\" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'

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

        this.myModal.show()

    }

    async displayAll () {
        let list = $('#list')
        let html = ""
        let listOfTasks = await this.model.getAll()

        if (listOfTasks.ok) {
            listOfTasks = await listOfTasks.json()
            html = '<ul class="list-group" id="list">'

            listOfTasks.taches.forEach(task => {
                html += `<li class="list-group-item" onclick="listController.getDetails('${task.id}')">${task.libelle} : ${task.avancement}%</li>`
            });
            html += '</ul>'
        } else {
            html = "Error"
            this.toast("error")
        }
        list.innerHTML = html
    }

    async displayComing() {
        let list = $('#list')
        let html = ""
        let listOfTasks = await this.model.getComing()

        if (listOfTasks.ok) {
            listOfTasks = await listOfTasks.json()

            html = '<ul class="list-group" id="list">'

            listOfTasks.taches[0].forEach(task => {
                html += `<li class="list-group-item" onclick="listController.getDetails('${task.id}')">${task.libelle} : ${task.avancement}%</li>`
            });
            html += '</ul>'
        } else {
            html = "Error"
            this.toast("error")
        }
        list.innerHTML = html
    }

    async displayPast() {
        let list = $('#list')
        let html = ""
        let listOfTasks = await this.model.getPast()

        if (listOfTasks.ok) {
            listOfTasks = await listOfTasks.json()
            
            html = '<ul class="list-group" id="list">'

            listOfTasks.taches[0].forEach(task => {
                html += `<li class="list-group-item" onclick="listController.getDetails('${task.id}')">${task.libelle} : ${task.avancement}%</li>`
            });
            html += '</ul>'
        } else {
            html = "Error"
            this.toast("error")
        }
        list.innerHTML = html
    }

    setDisplay() {
        let display = $('#display')
        let year    = new Date().getFullYear()
        let month   = new Date().getMonth()
        let day     = new Date().getDate()

        switch (display.value) {
            case 'A':
                this.displayAll()
                break
            case 'CU':
                break
            case 'C':
                this.displayComing()
                break
            case 'P':
                this.displayPast()
                break
        }
    }
}

window.listController = new listController()