import {DataTypes, Model} from 'sequelize'
import{sequelize} from '../database'

export class User extends Model{
    public id!: number;
    public nome!: string;
    public email!: string;
}
 
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email:{
            type: DataTypes.STRING,
            allowNull: false
        }

    },
    {
        sequelize,
        tableName: 'user'
    }
);