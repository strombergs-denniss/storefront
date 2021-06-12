import { DataTypes, Model, Sequelize } from 'sequelize'
import Address from './Address.model'
import Customer from './Customer.model'

export class Order extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                reference: {
                    type: DataTypes.STRING,
                    unique: true
                },
                date: {
                    type: DataTypes.DATE,
                    defaultValue: Sequelize.NOW
                },
                status: {
                    type: DataTypes.STRING,
                    defaultValue: 'ordered'
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
                customer_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: Customer,
                        key: 'id'
                    }
                },
                address_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: Address,
                        key: 'id'
                    }
                }
            },
            {
                sequelize,
                modelName: 'Order',
                timestamps: false
            }
        )
    }

    static associate(models) {
        this.hasOne(models.Invoice, { foreignKey: 'order_id' })
        this.hasMany(models.OrderItem, { foreignKey: 'order_id' })
        this.belongsTo(models.Address, { foreignKey: 'address_id' })
        this.belongsTo(models.Customer, { foreignKey: 'customer_id' })

    }
}

export default Order
