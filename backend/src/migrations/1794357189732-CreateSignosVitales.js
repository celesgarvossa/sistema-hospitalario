/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class CreateSignosVitales1794357189732 {
  /**
   * @param {QueryRunner} queryRunner
   */
  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE signos_vitales (
        id INT AUTO_INCREMENT PRIMARY KEY,
        paciente_id INT NOT NULL,
        temperatura DECIMAL(4,1) NULL,
        presion_sistolica INT NULL,
        presion_diastolica INT NULL,
        frecuencia_cardiaca INT NULL,
        saturacion_oxigeno INT NULL,
        alerta_temperatura BOOLEAN NOT NULL DEFAULT FALSE,
        registrado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT FK_signos_vitales_paciente
          FOREIGN KEY (paciente_id)
          REFERENCES pacientes(id)
      )
    `);
  }

  /**
   * @param {QueryRunner} queryRunner
   */
  async down(queryRunner) {
    await queryRunner.query(`
      DROP TABLE signos_vitales
    `);
  }
};