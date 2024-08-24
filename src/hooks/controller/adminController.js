import {connectSpring} from "../api/preAxios";

export const adminController = () => connectSpring.get('/admin');