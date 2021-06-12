import { DataTypes, Model } from 'sequelize'

export class Customer extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                email: {
                    type: DataTypes.STRING,
                    unique: true
                },
                password: {
                    type: DataTypes.STRING
                },
                firstName: {
                    type: DataTypes.STRING
                },
                lastName: {
                    type: DataTypes.STRING
                },
                token: {
                    type: DataTypes.TEXT
                },
                totalTax: {
                    type: DataTypes.FLOAT,
                    defaultValue: 0
                },
                subtotal: {
                    type: DataTypes.FLOAT,
                    defaultValue: 0
                },
                total: {
                    type: DataTypes.FLOAT,
                    defaultValue: 0
                }
            },
            {
                sequelize,
                modelName: 'Customer',
                timestamps: false
            }
        )
    }

    static associate(models) {
        this.hasMany(models.Address, { foreignKey: 'customer_id' })
        this.hasMany(models.Order, { foreignKey: 'customer_id' })
        this.hasMany(models.CartItem, { foreignKey: 'customer_id'})
    }
}

export default Customer
