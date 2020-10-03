import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgresql://root:root@database:5432/blog');

export default sequelize;
