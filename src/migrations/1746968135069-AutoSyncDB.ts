import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoSyncDB1746968135069 implements MigrationInterface {
    name = 'AutoSyncDB1746968135069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`me_devem\` (\`id_medevem\` int NOT NULL AUTO_INCREMENT, \`data\` datetime NOT NULL, \`nome\` varchar(255) NOT NULL, \`valor\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userIdUser\` int NULL, PRIMARY KEY (\`id_medevem\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`senha\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`me_devem\` ADD CONSTRAINT \`FK_b2097be43e5882c46f3875761c4\` FOREIGN KEY (\`userIdUser\`) REFERENCES \`user\`(\`id_user\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`me_devem\` DROP FOREIGN KEY \`FK_b2097be43e5882c46f3875761c4\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`senha\``);
        await queryRunner.query(`DROP TABLE \`me_devem\``);
    }

}
