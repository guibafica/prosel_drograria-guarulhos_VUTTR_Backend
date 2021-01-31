import Sequelize, { Model } from 'sequelize';

class Tool extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        link: Sequelize.STRING,
        description: Sequelize.TEXT,
        tags: Sequelize.TEXT,
        deleted_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Tool;
