import { Model, DataTypes } from 'sequelize'
import AttributeSet from './AttributeSet.model'
import Attribute from './AttributeSet.model'

export class AttributeSetAttribute extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                attribute_set_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: Attribute,
                        key: 'id'
                    }
                },
                attribute_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: AttributeSet,
                        key: 'id'
                    }
                }
            },
            {
                sequelize,
                modelName: 'AttributeSetAttribute',
                timestamps: false
            }
        )
    }

    static associate(models) {
        models.AttributeSet.belongsToMany(
            models.Attribute,
            {
                through: this,
                foreignKey: 'attribute_set_id'
            }
        )

        models.Attribute.belongsToMany(
            models.AttributeSet,
            {
                through: this,
                foreignKey: 'attribute_id'
            }
        )
    }
}

export default AttributeSetAttribute
