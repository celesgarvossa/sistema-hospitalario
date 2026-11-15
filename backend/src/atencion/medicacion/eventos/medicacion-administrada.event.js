export class MedicacionAdministradaEvent {
  constructor({
    administracionId,
    pacienteId,
    tipoCobertura,
    montoBase,
  }) {
    this.administracionId = administracionId;
    this.pacienteId = pacienteId;
    this.tipoCobertura = tipoCobertura;
    this.montoBase = montoBase;
  }
}