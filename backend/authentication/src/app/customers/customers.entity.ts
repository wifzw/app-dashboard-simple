import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'customers' })
export class CustomersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  full_name: string;

  @Column({ length: 255 })
  birth_date: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  phone: string;

  @Column()
  status: boolean;

  @Column({ length: 255, select: false })
  created_by_user_id: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: string;
}
