/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class CreateTurnos1793920261028 {
  /**
   * @param {QueryRunner} queryRunner
   */
  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE turnos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        agenda_id INT NOT NULL,
        paciente_id INT NOT NULL,
        hora_inicio TIME NOT NULL,
        hora_fin TIME NOT NULL,
        estado VARCHAR(30) NOT NULL DEFAULT 'Programado',
        tipo VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
        duracion_reducida BOOLEAN NOT NULL DEFAULT FALSE,
        version INT NOT NULL DEFAULT 1,

        CONSTRAINT UQ_turno_agenda_hora
          UNIQUE (agenda_id, hora_inicio),

        CONSTRAINT FK_turno_agenda
          FOREIGN KEY (agenda_id)
          REFERENCES agendas(id),

        CONSTRAINT FK_turno_paciente
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
      DROP TABLE turnos
    `);
  }
};