import { apiRequest } from './api';

export function obtenerAgendas() {
  return apiRequest('/agendas');
}

export function crearAgenda(datosAgenda) {
  return apiRequest('/agendas', {
    method: 'POST',
    body: JSON.stringify(datosAgenda),
  });
}
