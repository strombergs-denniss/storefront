import { DataTypes, Model } from 'sequelize'

export class Block extends Model {
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
                    defaultValue: true
                },
                content: {
                    type: DataTypes.TEXT
                }
            },
            {
                sequelize,
                modelName: 'Block',
                timestamps: false
            }
        )
    }
}

export default Block
