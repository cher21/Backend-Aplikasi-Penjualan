import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  // ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { product } from './product';

export interface product_categoryAttributes {
  cate_id?: number;
  cate_name?: string;
  description?: string;
  createdat?: Date;
  updateat?: Date;
}

@Table({ tableName: 'product_category', schema: 'public', timestamps: false })
export class product_category
  extends Model<product_categoryAttributes, product_categoryAttributes>
  implements product_categoryAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('product_category_cate_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_cate_id', using: 'btree', unique: true })
  cate_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  cate_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(200) })
  description?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  createdat?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updateat?: Date;

  @HasMany(() => product, { sourceKey: 'cate_id' })
  products?: product[];
}
