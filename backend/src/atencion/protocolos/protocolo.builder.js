import { Protocolo } from './protocolo';

export class ProtocoloBuilder {
  constructor() {
    this.protocolo = new Protocolo();
  }

  reiniciar() {
    this.protocolo = new Protocolo();
    return this;
  }

  establecerNombre(nombre) {
    this.protocolo.nombre = nombre;
    return this;
  }

  agregarPaso(paso) {
    this.protocolo.agregarPaso(paso);
    return this;
  }

  construir() {
    const resultado = this.protocolo;
    this.reiniciar();

    return resultado;
  }
}