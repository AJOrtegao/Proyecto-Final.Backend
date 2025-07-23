import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product as ProductEntity } from './product.entity';  
import { CreateProductDto } from '../admin/dto/create-product.dto';
import { UpdateProductDto } from '../admin/dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)  
    private readonly productRepo: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepo.find();
  }

  async findById(id: number): Promise<ProductEntity> {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async create(data: CreateProductDto): Promise<ProductEntity> {
    const product = this.productRepo.create(data);
    return this.productRepo.save(product);
  }

  async update(id: number, updateData: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.findById(id);
    Object.assign(product, updateData);
    return this.productRepo.save(product);
  }

  async delete(id: number): Promise<void> {
    const result = await this.productRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  }
}
