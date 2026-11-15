import {apiRequest} from './api';

export function obtenerMedicamentos(){
  return apiRequest('/inventario');
}

export function crearMedicamento(datos) {
  return apiRequest('/inventario', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
}
