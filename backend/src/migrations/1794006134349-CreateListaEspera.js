/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class CreateListaEspera1794006134349 {
  /**
   * @param {QueryRunner} queryRunner
   */
  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE lista_espera (
        id INT AUTO_INCREMENT PRIMARY KEY,
        agenda_id INT NOT NULL,
        paciente_id INT NOT NULL,
        hora_inicio TIME NOT NULL,
        hora_fin TIME NOT NULL,
        estado VARCHAR(20) NOT NULL DEFAULT 'ESPERANDO',
        creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT UQ_lista_espera_paciente_horario
          UNIQUE (agenda_id, hora_inicio, paciente_id),

        CONSTRAINT FK_lista_espera_agenda
          FOREIGN KEY (agenda_id)
          REFERENCES agendas(id),

        CONSTRAINT FK_lista_espera_paciente
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
      DROP TABLE lista_espera
    `);
  }
};