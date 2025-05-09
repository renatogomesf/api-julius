import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoSyncDB1746819897591 implements MigrationInterface {
    name = 'AutoSyncDB1746819897591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ganhos\` (\`id_ganho\` int NOT NULL AUTO_INCREMENT, \`data\` datetime NOT NULL, \`descricao\` varchar(255) NOT NULL, \`valor\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userIdUser\` int NULL, PRIMARY KEY (\`id_ganho\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ganhos\` ADD CONSTRAINT \`FK_9935f241ebe8a1cbefce23d103a\` FOREIGN KEY (\`userIdUser\`) REFERENCES \`user\`(\`id_user\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ganhos\` DROP FOREIGN KEY \`FK_9935f241ebe8a1cbefce23d103a\``);
        await queryRunner.query(`DROP TABLE \`ganhos\``);
    }

}
