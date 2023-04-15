import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { product_category } from './product_category';

export interface productAttributes {
  prod_id?: number;
  prod_name?: string;
  description?: string;
  category_id?: number;
  price?: number;
  image?: string;
  createdat?: Date;
  updateat?: Date;
}

@Table({ tableName: 'product', schema: 'public', timestamps: false })
export class product
  extends Model<productAttributes, productAttributes>
  implements productAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('product_prod_id_seq'::regclass)"),
  })
  @Index({ name: 'pk_product_id', using: 'btree', unique: true })
  prod_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  prod_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  description?: string;

  @ForeignKey(() => product_category)
  @Column({ allowNull: true, type: DataType.INTEGER })
  category_id?: number;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  price?: number;

  @Column({ allowNull: true, type: DataType.STRING(200) })
  image?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  createdat?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updateat?: Date;

  @BelongsTo(() => product_category)
  product_category?: product_category;
}
