import {Router} from 'express';
import {Auth} from '../middlewares/auth';
import * as ApiControllers from '../controllers/apiControllers';

const router = Router(); 

router.get('/ping', ApiControllers.ping); 
router.get ('/register', ApiControllers.register); 
router.get ('/login', ApiControllers.login);  
router.get ('/list',Auth.private, ApiControllers.list); 
router.get('/upform', ApiControllers.showUpForm);



export default router;
