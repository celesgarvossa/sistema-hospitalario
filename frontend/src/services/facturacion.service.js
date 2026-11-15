import {apiRequest} from './api';

export function obtenerCargos(){
  return apiRequest('/facturacion');
}
export function crearCargo(datos) {
  return apiRequest('/facturacion', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
}
