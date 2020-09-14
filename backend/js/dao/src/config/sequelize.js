import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgresql://root:root@localhost:5432/blog');

export default sequelize;
