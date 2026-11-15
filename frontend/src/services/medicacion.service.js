import {apiRequest} from './api';

export function obtenerAdministraciones(){
  return apiRequest('/medicacion');
}

export function administrarMedicacion(datos){
  return apiRequest('/medicacion', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
}
