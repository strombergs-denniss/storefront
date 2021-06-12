import { DataTypes, Model } from 'sequelize'

export class Page extends Model {
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
                    unique: true
                },
                isEnabled: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                title: {
                    type: DataTypes.STRING
                },
                content: {
                    type: DataTypes.TEXT
                }
            },
            {
                sequelize,
                modelName: 'Page',
                timestamps: false
            }
        )
    }
}

export default Page
