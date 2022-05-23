class partageController extends BaseController {
    constructor() {
        super()
        this.getPartage()
    }

    async getPartage() {
        this.model.getPartages()
    }
}

window.partageController = new partageController()