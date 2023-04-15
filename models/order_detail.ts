import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface order_detailAttributes {
  ordet_id?: number;
  order_id?: number;
  product_id?: number;
  quantity?: number;
  createdat?: Date;
  updateat?: Date;
}

@Table({ tableName: 'order_detail', schema: 'public', timestamps: false })
export class order_detail
  extends Model<order_detailAttributes, order_detailAttributes>
  implements order_detailAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('order_detail_ordet_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_ordet_id', using: 'btree', unique: true })
  ordet_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  order_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  product_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  quantity?: number;

  @Column({ allowNull: true, type: DataType.DATE })
  createdat?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updateat?: Date;
}
