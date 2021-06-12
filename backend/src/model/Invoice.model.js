import { DataTypes, Model, Sequelize } from 'sequelize'
import Order from './Order.model'

export class Invoice extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                date: {
                    type: DataTypes.DATE,
                    defaultValue: Sequelize.NOW
                },
                totalDelivery: {
                    type: DataTypes.FLOAT
                },
                totalTax: {
                    type: DataTypes.FLOAT
                },
                subtotal: {
                    type: DataTypes.FLOAT
                },
                total: {
                    type: DataTypes.FLOAT
                },
                order_id: {
                    type: DataTypes.INTEGER,
                    unique: true,
                    references: {
                        model: Order,
                        key: 'id'
                    }
                }
            },
            {
                sequelize,
                modelName: 'Invoice',
                timestamps: false
            }
        )
    }

    static associate(models) {
        this.belongsTo(models.Order, { foreignKey: 'order_id' })
    }
}

export default Invoice
