import { apiRequest } from './api';

export function obtenerPacientes() {
  return apiRequest('/pacientes');
}

export function crearPaciente(datos) {
  return apiRequest('/pacientes', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
}

export function actualizarPaciente(id, datos) {
  return apiRequest(`/pacientes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(datos),
  });
}

export function eliminarPaciente(id) {
  return apiRequest(`/pacientes/${id}`, {
    method: 'DELETE',
  });
}
