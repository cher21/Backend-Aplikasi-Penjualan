import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  // ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { users } from './users';

export interface customerAttributes {
  cust_id?: number;
  firstname?: string;
  lastname?: string;
  user_id?: number;
  createdat?: Date;
  updateat?: Date;
}

@Table({ tableName: 'customer', schema: 'public', timestamps: false })
export class customer
  extends Model<customerAttributes, customerAttributes>
  implements customerAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('customer_cust_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_cust_id', using: 'btree', unique: true })
  cust_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  firstname?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  lastname?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  user_id?: number;

  @Column({ allowNull: true, type: DataType.DATE })
  createdat?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updateat?: Date;

  @HasOne(() => users, { sourceKey: 'user_id' })
  user?: users;
}
