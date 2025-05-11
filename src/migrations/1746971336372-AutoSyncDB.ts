import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoSyncDB1746971336372 implements MigrationInterface {
    name = 'AutoSyncDB1746971336372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`devedores\` CHANGE \`id_medevem\` \`id_devedor\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`CREATE TABLE \`dividas\` (\`id_divida\` int NOT NULL AUTO_INCREMENT, \`data\` datetime NOT NULL, \`nome\` varchar(255) NOT NULL, \`valor\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userIdUser\` int NULL, PRIMARY KEY (\`id_divida\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`dividas\` ADD CONSTRAINT \`FK_1976d6990bd0fd22f05f5e1dc34\` FOREIGN KEY (\`userIdUser\`) REFERENCES \`user\`(\`id_user\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dividas\` DROP FOREIGN KEY \`FK_1976d6990bd0fd22f05f5e1dc34\``);
        await queryRunner.query(`DROP TABLE \`dividas\``);
        await queryRunner.query(`ALTER TABLE \`devedores\` CHANGE \`id_devedor\` \`id_medevem\` int NOT NULL AUTO_INCREMENT`);
    }

}
