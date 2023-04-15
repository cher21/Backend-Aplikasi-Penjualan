import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
} from 'sequelize-typescript';

export interface ordersAttributes {
  order_id?: number;
  user_id?: number;
  totalproduct?: number;
  totalprice?: number;
  createdat?: Date;
  updateat?: Date;
}

@Table({ tableName: 'orders', schema: 'public', timestamps: false })
export class orders
  extends Model<ordersAttributes, ordersAttributes>
  implements ordersAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('orders_order_id_seq'::regclass)"),
  })
  @Index({ name: 'pk_order_id', using: 'btree', unique: true })
  order_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  user_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  totalproduct?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  totalprice?: number;

  @Column({ allowNull: true, type: DataType.DATE })
  createdat?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updateat?: Date;
}
