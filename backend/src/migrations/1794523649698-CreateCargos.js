/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class CreateCargos1794523649698 {

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
  await queryRunner.query(`
    CREATE TABLE cargos (
      id INT NOT NULL AUTO_INCREMENT,
      paciente_id INT NOT NULL,
      tipo_cobertura VARCHAR(20) NOT NULL,
      concepto VARCHAR(150) NOT NULL,
      monto_base DECIMAL(10,2) NOT NULL,
      monto_final DECIMAL(10,2) NOT NULL,
      referencia_tipo VARCHAR(50) NULL,
      referencia_id INT NULL,
      creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      CONSTRAINT FK_cargo_paciente
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
    DROP TABLE cargos
  `);
}
}


