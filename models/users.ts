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
import { customer } from './customer';

export interface usersAttributes {
  user_id?: number;
  username?: string;
  user_password?: string;
  createdat?: Date;
  updateat?: Date;
}

@Table({ tableName: 'users', schema: 'public', timestamps: false })
export class users
  extends Model<usersAttributes, usersAttributes>
  implements usersAttributes
{
  @ForeignKey(() => customer)
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('users_user_id_seq'::regclass)"),
  })
  @Index({ name: 'pk_user_id', using: 'btree', unique: true })
  user_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  username?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  user_password?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  createdat?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updateat?: Date;

  @BelongsTo(() => customer)
  customer?: customer;
}
