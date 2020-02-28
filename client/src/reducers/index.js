import { combineReducers } from 'redux';
import registerReducer from './registerReducer';
import loginReducer from './loginReducer';
import userProfileReducer from './userProfileReducer';
import actualizarDatosUserReducer from './actualizarDatosUserReducer';
import compartirLugarReducer from './compartirLugarReducer';
import lugarReducer from './lugarReducer';
import comentarLugarReducer from './comentarLugarReducer';
import fetchTodosLosLugaresReducer from './fetchTodosLosLugaresReducer';
import likearLugarReducer from './likearLugarReducer';
import eliminarPerfilReducer from './eliminarPerfilReducer';

const rootReducer = combineReducers({
  register: registerReducer,
  auth: loginReducer,
  userProfile: userProfileReducer,
  updateUserData: actualizarDatosUserReducer,
  compartirLugar: compartirLugarReducer,
  lugar: lugarReducer,
  comentario: comentarLugarReducer,
  todosLosLugares: fetchTodosLosLugaresReducer,
  like: likearLugarReducer,
  borrarUser: eliminarPerfilReducer,
  borrarLugar: eliminarPerfilReducer
});

export default rootReducer;
