import { generateTypeDef } from './TypeDef'
import { generateResolver } from './Resolver'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import cartTypeDef from '../type-def/Cart.type-def'
import checkoutTypeDef from '../type-def/Checkout.type-def'
import searchTypeDef from '../type-def/Search.type-def'
import cartResolver from '../resolver/Cart.resolver'
import checkoutResolver from '../resolver/Checkout.resolver'
import searchResolver from '../resolver/Search.resolver'
import accountTypeDef from '../type-def/Account.type-def'
import accountResolver from '../resolver/Account.resolver'
import productResolver from '../resolver/Product.resolver'
import productTypeDef from '../type-def/Product.type-def'
import userTypeDef from '../type-def/User.type'
import userResolver from '../resolver/User.resolver'
import addressResolver from '../resolver/Address.resolver'
import reviewResolver from '../resolver/Review.resolver'
import addressTypeDef from '../type-def/Address.type-DEF'
import reviewTypeDef from '../type-def/Review.type-def'
import ordersTypeDef from '../type-def/Order.type-def'
import orderResolver from '../resolver/Order.resolver'
import mediaTypeDef from '../type-def/Media.type.def'
import mediaResolver from '../resolver/Media.resolver'

export function buildSchema(models) {
    const typeDefs = [
        ...Object.values(models).map(generateTypeDef),
        accountTypeDef,
        cartTypeDef,
        checkoutTypeDef,
        searchTypeDef,
        productTypeDef,
        userTypeDef,
        addressTypeDef,
        reviewTypeDef,
        ordersTypeDef,
        mediaTypeDef
    ]
    const resolvers = [
        ...Object.values(models).map(generateResolver),
        accountResolver,
        cartResolver,
        checkoutResolver,
        searchResolver,
        productResolver,
        userResolver,
        addressResolver,
        reviewResolver,
        orderResolver,
        mediaResolver
    ]

    return makeExecutableSchema({
        typeDefs: mergeTypeDefs(typeDefs),
        resolvers: mergeResolvers(resolvers)
    })
}

export default buildSchema
