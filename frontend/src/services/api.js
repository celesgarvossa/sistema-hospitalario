const API_URL = 'http://localhost:3000';

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    },
  );

  if (!response.ok) {
    let mensaje = 'Error al comunicarse con el servidor';

    try {
      const error = await response.json();

      mensaje =
        error.message ||
        mensaje;
    } catch {
      // Si la respuesta no tiene JSON,
      // mantenemos el mensaje genérico.
    }

    throw new Error(mensaje);
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}
