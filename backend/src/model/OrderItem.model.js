import { DataTypes, Model } from 'sequelize'
import Order from './Order.model'
import Product from './Product.model'

export class OrderItem extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                quantity: {
                    type: DataTypes.INTEGER
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
                    references: {
                        model: Order,
                        key: 'id'
                    }
                },
                product_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: Product,
                        key: 'id'
                    }
                }
            },
            {
                sequelize,
                modelName: 'OrderItem',
                timestamps: false
            }
        )
    }

    static associate(models) {
        this.belongsTo(models.Order, { foreignKey: 'order_id' })
        this.belongsTo(models.Product, { foreignKey: 'product_id' })
    }
}

export default OrderItem
