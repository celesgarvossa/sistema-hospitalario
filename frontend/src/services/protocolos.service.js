import { apiRequest } from './api';

export function obtenerProtocoloPreoperatorio() {
  return apiRequest('/protocolos/preoperatorio');
}

export function obtenerProtocoloRespiratorio() {
  return apiRequest('/protocolos/respiratorio');
}
