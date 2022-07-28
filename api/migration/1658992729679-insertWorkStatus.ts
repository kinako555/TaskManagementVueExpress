import { MigrationInterface, QueryRunner } from "typeorm"

export class insertWorkStatus1658992729679 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `INSERT INTO work_status (name) VALUES ("未対応"),("対応中"),("保留"),("完了");`,
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `DELETE FROM work_status;`,
      );
    }

}
