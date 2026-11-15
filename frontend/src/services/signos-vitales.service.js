import {apiRequest} from './api';

export function obtenerSignosVitales(){
  return apiRequest('/signos-vitales');
}

export function registrarSignosVitales(datos){
  return apiRequest('/signos-vitales', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
}
