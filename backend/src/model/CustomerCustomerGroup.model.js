import { DataTypes, Model } from 'sequelize'
import Customer from './Customer.model'
import CustomerGroup from './CustomerGroup.model'

export class CustomerCustomerGroup extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                customer_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: Customer,
                        key: 'id'
                    }
                },
                customer_group_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: CustomerGroup,
                        key: 'id'
                    }
                }
            },
            {
                sequelize,
                modelName: 'CustomerCustomerGroup',
                timestamps: false
            }
        )
    }

    static associate(models) {
        models.Customer.belongsToMany(
            models.CustomerGroup,
            {
                through: this,
                foreignKey: 'customer_id'
            }
        )

        models.CustomerGroup.belongsToMany(
            models.Customer,
            {
                through: this,
                foreignKey: 'customer_group_id'
            }
        )
    }
}

export default CustomerCustomerGroup
