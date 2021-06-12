import { DataTypes, Model } from 'sequelize'
import Product from './Product.model'
import Category from './Category.model'

export class ProductCategory extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                product_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: Product,
                        key: 'id'
                    }
                },
                category_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: Category,
                        key: 'id'
                    }
                }
            },
            {
                sequelize,
                modelName: 'ProductCategory',
                timestamps: false
            }
        )
    }
    
    static associate(models) {
        models.Product.belongsToMany(
            models.Category,
            {
                through: this,
                foreignKey: 'product_id'
            }
        )

        models.Category.belongsToMany(
            models.Product,
            {
                through: this,
                foreignKey: 'category_id'
            }
        )
    }
}

export default ProductCategory
