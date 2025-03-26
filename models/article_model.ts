import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Table } from '@sequelize/core/decorators-legacy';

// TODO:: change timestamps name
@Table({
    tableName: "articles",
    timestamps: false
})
export class Article extends Model<InferAttributes<Article>, InferCreationAttributes<Article>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare title: string;

    @Attribute(DataTypes.TEXT)
    declare alltext: string | null;

    @Attribute(DataTypes.TEXT)
    declare summary: string | null;
}