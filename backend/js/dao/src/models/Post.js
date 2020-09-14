import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class Post extends Model {}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  tableName: 'post',
  timestamps: false,
});

export default Post;
