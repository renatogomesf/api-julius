import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoSyncDB1746823668535 implements MigrationInterface {
    name = 'AutoSyncDB1746823668535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`despesas\` (\`id_ganho\` int NOT NULL AUTO_INCREMENT, \`data\` datetime NOT NULL, \`descricao\` varchar(255) NOT NULL, \`valor\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userIdUser\` int NULL, PRIMARY KEY (\`id_ganho\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`despesas\` ADD CONSTRAINT \`FK_0073077d5a8dee89d5c868dc167\` FOREIGN KEY (\`userIdUser\`) REFERENCES \`user\`(\`id_user\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`despesas\` DROP FOREIGN KEY \`FK_0073077d5a8dee89d5c868dc167\``);
        await queryRunner.query(`DROP TABLE \`despesas\``);
    }

}
