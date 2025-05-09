import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoSyncDB1746824948208 implements MigrationInterface {
    name = 'AutoSyncDB1746824948208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`despesas\` CHANGE \`id_ganho\` \`id_despesa\` int NOT NULL AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`despesas\` CHANGE \`id_despesa\` \`id_ganho\` int NOT NULL AUTO_INCREMENT`);
    }

}
