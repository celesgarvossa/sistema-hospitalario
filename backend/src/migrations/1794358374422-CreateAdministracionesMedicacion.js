/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class CreateAdministracionesMedicacion1794358374422 {
  /**
   * @param {QueryRunner} queryRunner
   */
  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE administraciones_medicacion (
        id INT AUTO_INCREMENT PRIMARY KEY,
        paciente_id INT NOT NULL,
        medicamento_id INT NOT NULL,
        enfermero_id INT NOT NULL,
        cantidad INT NOT NULL,
        horario_programado DATETIME NOT NULL,
        horario_administracion DATETIME NOT NULL,
        dentro_ventana BOOLEAN NOT NULL DEFAULT FALSE,
        registrado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT FK_administracion_medicacion_paciente
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
      DROP TABLE administraciones_medicacion
    `);
  }
};