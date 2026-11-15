/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class CreateTriage1794354647207 {
  /**
   * @param {QueryRunner} queryRunner
   */
  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE triage (
        id INT AUTO_INCREMENT PRIMARY KEY,
        paciente_id INT NOT NULL,
        codigo VARCHAR(20) NOT NULL,
        prioridad INT NOT NULL,
        estado VARCHAR(20) NOT NULL DEFAULT 'ESPERANDO',
        creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT FK_triage_paciente
          FOREIGN KEY (paciente_id)
          REFERENCES pacientes(id),

        INDEX IDX_triage_cola (
          estado,
          prioridad,
          creado_en
        )
      )
    `);
  }

  /**
   * @param {QueryRunner} queryRunner
   */
  async down(queryRunner) {
    await queryRunner.query(`
      DROP TABLE triage
    `);
  }
};