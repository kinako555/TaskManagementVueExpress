import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateWorkStatus1658675636827 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
        `CREATE TABLE work_status (
            id BIGINT(20) NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
            PRIMARY KEY (id) USING BTREE
        )
        COLLATE='utf8mb4_general_ci'
        ENGINE=InnoDB
        AUTO_INCREMENT=2;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
