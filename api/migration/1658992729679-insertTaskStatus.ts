import { MigrationInterface, QueryRunner } from "typeorm"

export class insertTaskStatus1658992729679 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `INSERT INTO task_status (name) VALUES ("未対応"),("対応中"),("保留"),("完了");`,
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `DELETE FROM task_status;`,
      );
    }

}
