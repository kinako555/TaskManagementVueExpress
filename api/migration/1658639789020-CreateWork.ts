import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateWork1658639789020 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE works (
                id BIGINT(20) NOT NULL AUTO_INCREMENT,
                title VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
                content TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                user_id CHAR(1) NOT NULL COLLATE 'utf8mb4_general_ci',
                work_status_id BIGINT(20) NOT NULL,
                PRIMARY KEY (id) USING BTREE,
                INDEX works_ibfk_1 (user_id) USING BTREE,
                INDEX works_works_status (work_status_id) USING BTREE,
                CONSTRAINT works_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
                CONSTRAINT works_works_status FOREIGN KEY (work_status_id) REFERENCES work_status (id) ON UPDATE CASCADE ON DELETE NO ACTION
            )
            COLLATE='utf8mb4_general_ci'
            ENGINE=InnoDB;`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE works`);
    }

}
