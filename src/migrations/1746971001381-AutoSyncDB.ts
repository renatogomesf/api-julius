import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoSyncDB1746971001381 implements MigrationInterface {
    name = 'AutoSyncDB1746971001381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`devedores\` (\`id_medevem\` int NOT NULL AUTO_INCREMENT, \`data\` datetime NOT NULL, \`nome\` varchar(255) NOT NULL, \`valor\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userIdUser\` int NULL, PRIMARY KEY (\`id_medevem\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`devedores\` ADD CONSTRAINT \`FK_dcce51ffa587317eecc1008f94e\` FOREIGN KEY (\`userIdUser\`) REFERENCES \`user\`(\`id_user\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`devedores\` DROP FOREIGN KEY \`FK_dcce51ffa587317eecc1008f94e\``);
        await queryRunner.query(`DROP TABLE \`devedores\``);
    }

}
