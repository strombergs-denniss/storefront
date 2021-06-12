import { DataTypes, Model } from 'sequelize'
import AttributeSet from './AttributeSet.model'

export class Product extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                urlKey: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: true
                },
                sku: {
                    type: DataTypes.STRING,
                    unique: true
                },
                isEnabled: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                name: {
                    type: DataTypes.STRING
                },
                price: {
                    type: DataTypes.FLOAT
                },
                stockQuantity: {
                    type: DataTypes.INTEGER
                },
                specialDiscountType: {
                    type: DataTypes.STRING,
                    defaultValue: null
                },
                specialDiscountValue: {
                    type: DataTypes.FLOAT,
                    defaultValue: null
                },
                specialTaxRate: {
                    type: DataTypes.FLOAT,
                    defaultValue: 21
                },
                shortDescription: {
                    type: DataTypes.STRING,
                    defaultValue: ''
                },
                longDescription: {
                    type: DataTypes.TEXT,
                    defaultValue: ''
                },
                baseImage: {
                    type: DataTypes.JSONB,
                    defaultValue: null
                },
                thumbnailImage: {
                    type: DataTypes.JSONB,
                    defaultValue: null
                },
                otherImages: {
                    type: DataTypes.JSONB,
                    defaultValue: null
                },
                attributeValues: {
                    type: DataTypes.JSONB,
                    defaultValue: null
                },
                soldAmount: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0
                },
                attribute_set_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: AttributeSet,
                        key: 'id'
                    }
                }
            },
            {
                sequelize,
                modelName: 'Product',
                timestamps: false
            }
        )
    }

    static associate(models) {
        this.belongsTo(models.AttributeSet, { foreignKey: 'attribute_set_id' })
        this.hasMany(models.CartItem, { foreignKey: 'product_id' })
        this.hasMany(models.OrderItem, { foreignKey: 'product_id', onDelete: 'SET NULL' })
        this.hasMany(models.Review, { foreignKey: 'product_id' })
    }
}

export default Product
