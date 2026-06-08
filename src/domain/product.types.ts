export type ProductCategory = 'extract'

export interface Product {
  readonly id: string
  readonly category: ProductCategory
  readonly featured?: boolean
}
