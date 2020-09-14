import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgresql://localhost:5432/blog');

export default sequelize;
