export class Protocolo {
  constructor() {
    this.nombre = '';
    this.pasos = [];
  }

  agregarPaso(paso) {
    this.pasos.push(paso);
  }
}