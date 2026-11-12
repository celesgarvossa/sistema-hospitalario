/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class CreateCamas1794447433516 {

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
  await queryRunner.query(`
    CREATE TABLE camas (
      id INT NOT NULL AUTO_INCREMENT,
      numero VARCHAR(20) NOT NULL,
      sector VARCHAR(100) NOT NULL,
      estado VARCHAR(30) NOT NULL DEFAULT 'Libre',
      paciente_id INT NULL,
      UNIQUE KEY UQ_cama_numero (numero),
      PRIMARY KEY (id),
      CONSTRAINT FK_cama_paciente
        FOREIGN KEY (paciente_id)
        REFERENCES pacientes(id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    ) ENGINE=InnoDB
  `);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
  await queryRunner.query(`
    DROP TABLE camas
  `);
    }

}


