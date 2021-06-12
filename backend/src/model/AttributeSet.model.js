import { Model, DataTypes } from 'sequelize'

export class AttributeSet extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                code: {
                    type: DataTypes.STRING,
                    unique: true
                },
                isEnabled: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                name: {
                    type: DataTypes.STRING
                }
            },
            {
                sequelize,
                modelName: 'AttributeSet',
                timestamps: false
            }
        )
    }

    static associate(models) {
        this.hasMany(models.Product, { foreignKey: 'attribute_set_id', onDelete: 'SET NULL' })
    }
}

export default AttributeSet
