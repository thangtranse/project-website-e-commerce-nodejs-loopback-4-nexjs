import {inject} from '@loopback/core';
import {
  CountSchema,


  repository
} from '@loopback/repository';
import {
  get
} from '@loopback/rest';
import {CategoryRepository, NewsRepository, ProductRepository} from '../repositories';
import {MyProductService} from "../services/product.service";

export class DashboardController {
  constructor(

    @inject('services.MyProductService')
    protected myProductService: MyProductService,

    @repository(NewsRepository)
    public newsRepository: NewsRepository,

    @repository(ProductRepository)
    public productRepository: ProductRepository,

    @repository(CategoryRepository)
    public categoryRepository: CategoryRepository,

  ) { }

  @get('/dashboard', {
    responses: {
      '200': {
        description: 'Dashboard',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(): Promise<{}> {
    // Số lượng Category
    const categories = await this.categoryRepository.find({})
    const latestProduct = await this.myProductService.productsNew({limit: 10, fields: {productId: true, title: true, slug: true, image: true, createAt: true}})

    let latestProductTemp: any[] = []
    if (latestProduct) {
      latestProductTemp = latestProduct.map(data => {
        const tempTime = new Date(data.createAt)
        return {
          ...data,
          createAt: tempTime.toLocaleString()
        }
      })
    }
    return {
      latestProduct: latestProductTemp
    };
  }

}
