import {connectSpring} from "../preAxios";

const adminController = () => connectSpring.get('/admin');