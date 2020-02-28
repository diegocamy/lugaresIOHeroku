import { userRegister } from './userRegister';
import { login, logout } from './userLogin';
import { fetchProfile } from './fetchProfile';
import { editarPerfil } from './editarPerfil';
import { compartirLugar } from './compartirLugar';
import { fetchLugar } from './fetchLugar';
import { comentarLugar } from './comentarLugar';
import { likearLugar } from './likearLugar';
import { fetchTodosLosLugares } from './fetchTodosLosLugares';
import { borrarUsuario } from './eliminarPerfil';
import { borrarLugar } from './eliminarLugar';

const actions = {
  userRegister,
  login,
  logout,
  fetchProfile,
  editarPerfil,
  compartirLugar,
  fetchLugar,
  comentarLugar,
  fetchTodosLosLugares,
  likearLugar,
  borrarUsuario,
  borrarLugar
};

export default actions;
