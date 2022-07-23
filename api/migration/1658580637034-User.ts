import { MigrationInterface, QueryRunner } from "typeorm"

export class User1658580637034 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `age` int NOT NULL, PRIMARY KEY (`id`))");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
