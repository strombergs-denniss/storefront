import { DataTypes, Model, Sequelize } from 'sequelize'
import Customer from './Customer.model'
import Product from './Product.model'

export class Review extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    unique: true
                },
                status: {
                    type: DataTypes.STRING,
                    defaultValue: 'pending'
                },
                date: {
                    type: DataTypes.DATE,
                    defaultValue: Sequelize.NOW
                },
                title: {
                    type: DataTypes.STRING
                },
                content: {
                    type: DataTypes.TEXT
                },
                rating: {
                    type: DataTypes.INTEGER
                },
                customer_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    references: {
                        model: Customer,
                        key: 'id'
                    },
                },
                product_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    references: {
                        model: Product,
                        key: 'id'
                    }
                }
            },
            {
                sequelize,
                modelName: 'Review',
                timestamps: false
            }
        )
    }

    static associate(models) {
        this.belongsTo(models.Customer, { foreignKey: 'customer_id' })
        this.belongsTo(models.Product, { foreignKey: 'product_id' })
    }
}

export default Review
