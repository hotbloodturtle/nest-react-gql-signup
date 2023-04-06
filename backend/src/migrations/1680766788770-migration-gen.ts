import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationGen1680766788770 implements MigrationInterface {
    name = 'migrationGen1680766788770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_admin\` tinyint NOT NULL DEFAULT 0, \`is_active\` tinyint NOT NULL DEFAULT 0, \`email\` varchar(60) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(50) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`refresh_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`expired_at\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` int NULL, UNIQUE INDEX \`REL_6bbe63d2fe75e7f0ba1710351d\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`refresh_token\` ADD CONSTRAINT \`FK_6bbe63d2fe75e7f0ba1710351d4\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`refresh_token\` DROP FOREIGN KEY \`FK_6bbe63d2fe75e7f0ba1710351d4\``);
        await queryRunner.query(`DROP INDEX \`REL_6bbe63d2fe75e7f0ba1710351d\` ON \`refresh_token\``);
        await queryRunner.query(`DROP TABLE \`refresh_token\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
