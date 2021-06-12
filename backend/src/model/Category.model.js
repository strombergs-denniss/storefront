import { DataTypes, Model } from 'sequelize'

export class Category extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                urlKey: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: true
                },
                isEnabled: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                name: {
                    type: DataTypes.STRING
                },
                isInMenu: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                content: {
                    type: DataTypes.TEXT,
                    defaultValue: ''
                },
                category_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: Category,
                        key: 'id'
                    }
                }
            },
            {
                sequelize,
                modelName: 'Category',
                timestamps: false
            }
        )
    }

    static associate() {
        this.hasMany(this, { foreignKey: 'category_id' })
        this.belongsTo(this, { foreignKey: 'category_id' })
    }
}

export default Category
