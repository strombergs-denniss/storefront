import { DataTypes, Model } from 'sequelize'

export class PaymentMethod extends Model {
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
                modelName: 'PaymentMethod',
                timestamps: false
            }
        )
    }
}

export default PaymentMethod
