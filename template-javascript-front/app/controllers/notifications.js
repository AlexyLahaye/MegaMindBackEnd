import BaseController from "./basecontroller.js";
import MyModel from "../model/postmodel.js";

class postController extends BaseController {
    constructor() {
        super()
        this.model = new MyModel()
        this.splitedToken = parseJwt(sessionStorage.getItem('token'));
    }

}

export default () => window.postController = new postController()