/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class CreateMedicamentos1794441708593 {

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
  await queryRunner.query(`
    CREATE TABLE medicamentos (
      id INT NOT NULL AUTO_INCREMENT,
      nombre VARCHAR(100) NOT NULL,
      descripcion VARCHAR(255) NULL,
      stock INT NOT NULL DEFAULT 0,
      activo TINYINT NOT NULL DEFAULT 1,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB
  `);
}

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
  await queryRunner.query(`
    DROP TABLE medicamentos
  `);
}

}




