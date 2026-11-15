import { apiRequest } from './api';

export function obtenerTriage() {
  return apiRequest('/triage');
}

export function registrarTriage(datos) {
  return apiRequest('/triage', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
}
