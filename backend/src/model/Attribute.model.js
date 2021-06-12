import { Model, DataTypes } from 'sequelize'

export class Attribute extends Model {
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
                label: {
                    type: DataTypes.STRING
                },
                type: {
                    type: DataTypes.STRING
                },
                attributeOptions: {
                    type: DataTypes.JSONB,
                    defaultValue: null
                },
                isFilter: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                attributeGroup: {
                    type: DataTypes.STRING
                }
            },
            {
                sequelize,
                modelName: 'Attribute',
                timestamps: false
            }
        )
    }
}

export default Attribute
