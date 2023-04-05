import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1680681250483 implements MigrationInterface {
    name = 'SecondMigration1680681250483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`description\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`description\``);
    }

}
