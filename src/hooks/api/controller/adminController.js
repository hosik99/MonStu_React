import {connectSpring} from "../preAxios";

export const adminController = () => connectSpring.get('/admin');