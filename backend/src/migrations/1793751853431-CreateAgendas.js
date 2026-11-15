/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class CreateAgendas1793751853431 {
  /**
   * @param {QueryRunner} queryRunner
   */
  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE agendas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        medico_id INT NOT NULL,
        fecha DATE NOT NULL,
        activa BOOLEAN NOT NULL DEFAULT TRUE,
        CONSTRAINT UQ_agenda_medico_fecha
          UNIQUE (medico_id, fecha)
      )
    `);
  }

  /**
   * @param {QueryRunner} queryRunner
   */
  async down(queryRunner) {
    await queryRunner.query(`
      DROP TABLE agendas
    `);
  }
};