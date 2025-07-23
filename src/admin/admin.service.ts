import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductModel } from '../products/product.model'; // Asegúrate de que esto es un modelo de Mongoose
import { CreateProductDto } from './dto/create-product.dto';
import { Order } from '../orders/order.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // Crear un producto
  async createProduct(createProductDto: CreateProductDto) {
    try {
      const newProduct = new ProductModel(createProductDto);
      await newProduct.save(); // Usa Mongoose para guardar el producto
      return newProduct;
    } catch (error) {
      console.error('Error al crear el producto:', error);
      throw new Error('Error al crear el producto');
    }
  }

  // Actualizar un producto
  async updateProduct(id: string, updateProductDto: CreateProductDto) {
    try {
      return await ProductModel.findByIdAndUpdate(id, updateProductDto, { new: true });
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      throw new Error('Error al actualizar el producto');
    }
  }

  // Eliminar un producto
  async deleteProduct(id: string) {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw new Error('Error al eliminar el producto');
    }
  }

  // Obtener todos los productos
  async getAllProducts() {
    try {
      return await ProductModel.find();
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw new Error('Error al obtener productos');
    }
  }

  // Obtener todas las órdenes
  async getOrders() {
    return await this.orderRepository.find();
  }
}
