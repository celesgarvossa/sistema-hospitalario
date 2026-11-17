import { apiRequest } from './api';

export function obtenerCamas() {
  return apiRequest('/camas');
}

export function crearCama(datos) {
  return apiRequest('/camas', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
}

export function asignarCama(id, pacienteId, tipoIngreso) {
  return apiRequest(`/camas/${id}/asignar`, {
    method: 'PATCH',
    body: JSON.stringify({
      pacienteId,
      tipoIngreso,
    }),
  });
}

export function darAltaCama(id) {
  return apiRequest(`/camas/${id}/alta`, {
    method: 'PATCH',
  });
}

export function finalizarLimpieza(id) {
  return apiRequest(
    `/camas/${id}/finalizar-limpieza`,
    {
      method: 'PATCH',
    },
  );
}

export function bloquearCama(id) {
  return apiRequest(`/camas/${id}/bloquear`, {
    method: 'PATCH',
  });
}

export function desbloquearCama(id) {
  return apiRequest(`/camas/${id}/desbloquear`, {
    method: 'PATCH',
  });
}
