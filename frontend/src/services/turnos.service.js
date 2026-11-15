import { apiRequest } from './api';

export function obtenerTurnos() {
  return apiRequest('/turnos');
}

export function crearTurno(datos) {
  return apiRequest('/turnos', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
}

export function crearEntreturno(datos) {
  return apiRequest('/turnos/entreturno', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
}

export function confirmarTurno(id) {
  return apiRequest(`/turnos/${id}/confirmar`, {
    method: 'PATCH',
  });
}

export function ingresarSalaEspera(id) {
  return apiRequest(`/turnos/${id}/sala-espera`, {
    method: 'PATCH',
  });
}

export function atenderTurno(id) {
  return apiRequest(`/turnos/${id}/atender`, {
    method: 'PATCH',
  });
}

export function cancelarTurno(id) {
  return apiRequest(`/turnos/${id}/cancelar`, {
    method: 'PATCH',
  });
}
export function agregarAListaEspera(datos) {
  return apiRequest('/turnos/lista-espera', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
}

export function obtenerListaEspera(
  agendaId,
  horaInicio,
) {
  return apiRequest(
    `/turnos/lista-espera/${agendaId}/${horaInicio}`,
  );
}
