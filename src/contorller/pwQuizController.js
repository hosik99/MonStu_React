import { connectSpring } from "../api/preAxios";

export const pwQuizController = (url) => connectSpring.get('/admin/pwquiz'+url)
