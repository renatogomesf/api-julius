import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoSyncDB1746800856334 implements MigrationInterface {
    name = 'AutoSyncDB1746800856334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    }

}
