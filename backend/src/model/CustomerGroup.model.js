import { DataTypes, Model } from 'sequelize'

export class CustomerGroup extends Model {
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
                name: {
                    type: DataTypes.STRING
                }
            },
            {
                sequelize,
                modelName: 'CustomerGroup',
                timestamps: false
            }
        )
    }
}

export default CustomerGroup
