import { DataTypes, Model } from 'sequelize'
import Customer from './Customer.model'
import Product from './Product.model'

export class CartItem extends Model {
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
                customer_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: Customer,
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
                modelName: 'CartItem',
                timestamps: false
            }
        )
    }

    static associate(models) {
        models.Customer.belongsToMany(
            models.Product,
            {
                through: this,
                foreignKey: 'customer_id'
            }
        )

        models.Product.belongsToMany(
            models.Customer,
            {
                through: this,
                foreignKey: 'product_id'
            }
        )
        
        this.belongsTo(models.Product, { foreignKey: 'product_id'})
        this.belongsTo(models.Customer, { foreignKey: 'customer_id'})
    }
}

export default CartItem
