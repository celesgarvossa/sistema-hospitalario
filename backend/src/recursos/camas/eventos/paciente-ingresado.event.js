export class PacienteIngresadoEvent {
  constructor(datos) {
    this.camaId = datos.camaId;
    this.pacienteId = datos.pacienteId;
    this.tipoIngreso = datos.tipoIngreso;
  }
}