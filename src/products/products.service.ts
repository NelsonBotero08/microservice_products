import { HttpException, HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ProductsService')

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database Connected')
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto
    })
  }

  async findAll(pagination: PaginationDto) {

    const { page, limit } = pagination

    const currentPage = page ?? 1
    const currentLimit = limit ?? 10

    const totalRegiter = await this.product.count()
    const totalPage = Math.ceil(totalRegiter / currentLimit)

    let pages = 'página'

    if ( totalPage != 1){
      pages = 'Páginas'
    }

    if( currentPage > totalPage ){
      throw new HttpException('Page does not exist', HttpStatus.BAD_REQUEST) 
    }

    return {
      data: await this.product.findMany({
        skip: (currentPage - 1) * currentLimit, 
        take: limit
      }),
      meta: {
        totalRegister: totalRegiter,
        page: `${currentPage} de ${totalPage} ${pages}`,
      }

    }
  }

  async findOne(id: number) {

    const productOne = await this.product.findUnique({
      where: { id }
    })

    if (!productOne) {
      throw new NotFoundException(`product with id ${ id } does not exist`)
    }

    return productOne;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    await this.findOne(id)

    return this.product.update({
      where: { id },
      data: updateProductDto
    });
  }

  async remove(id: number) {

    this.findOne(id)

    const product = await this.product.update({
      where: { id },
      data: {
        available: false
      }
    });

    return product
  }
}
