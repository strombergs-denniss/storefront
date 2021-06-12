import { DataTypes, Model } from 'sequelize'

export class Config extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                currencySign: {
                    type: DataTypes.STRING
                },
                currencySignPosition: {
                    type: DataTypes.STRING
                }
            },
            {
                sequelize,
                modelName: 'Config',
                timestamps: false
            }
        )
    }
}

export default Config
