import faker from 'faker'
import { encryptPassword } from './Auth'
import CONFIG from './Config'
import { attributes, attributeSetAttributes, attributeSets, blocks, categories, configs, customerGroups, pages, paymentMethods, shippingMethods } from './CoreData'

export function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function generateCustomers(count) {
    return new Array(count).fill({}).map(() => ({
        email: faker.internet.email(),
        password: encryptPassword(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        totalTax: 0,
        subtotal: 0,
        total: 0
    }))
}

export function generateUsers(count) {
    return new Array(count).fill({}).map(() => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: encryptPassword(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
    }))
}

export function generateAddresses(customers, count) {
    const addresses = []

    customers.forEach((customer, index) => {
        addresses.push({
            firstName: customer.firstName,
            lastName: customer.lastName,
            phoneNumber: faker.phone.phoneNumber(),
            country: faker.address.country(),
            city: faker.address.city(),
            province: faker.address.state(),
            street1: faker.address.streetAddress(),
            street2: Math.random() > 0.5 ? faker.address.streetAddress() : '',
            postalCode: faker.address.zipCode(),
            customer_id: index + 1
        })
    })

    return addresses
}

export function generateCustomerCustomerGroups(customers) {
    const customerCustomerGroups = []

    customers.forEach((customer, index) => {
        customerCustomerGroups.push({
            customer_id: index + 1,
            customer_group_id: randomInteger(1, customerGroups.length)
        })
    })

    return customerCustomerGroups
}

export const pencilTypes = [
    'graphite pencil',
    'solid graphite pencil',
    'liquid graphite pencil',
    'charcoal pencil',
    'carbon pencil',
    'colored pencil',
    'grease pencil',
    'watercolor pencil',
    'mechanical pencil'
]

export const penTypes = [
    'fountain pen',
    'ballpoint pen',
    'roller ball pen',
    'gel pen pen',
    'stylus pen',
    'novelty pen'
]

export const drawingAccessoryTypes = [
    'mechanical pencil lead',
    'eraser'
]

export function getAttributes(attribute_set_id) {
    return attributeSetAttributes.filter((item) => item.attribute_set_id == attribute_set_id).map((item) => attributes[item.attribute_id - 1])
}

export function generateAttributeValues(attribute_set_id) {
    const attributes = getAttributes(attribute_set_id)
    const attributeValues = {}

    attributes.forEach((attribute) => {
        const { attributeOptions, type, code } = attribute

        if (type === 'boolean') {
            attributeValues[code] = Math.random() > 0.5
        }

        if (type === 'number') {
            attributeValues[code] = randomInteger(0, 100)
        }

        if (type === 'string') {
            attributeValues[code] = faker.lorem.sentence(5)
        }

        if ((type === 'select_number' || type === 'select_string') && attributeOptions.length) {
            attributeValues[code] = attributeOptions[randomInteger(0, attributeOptions.length - 1)].value
        }
    })

    return attributeValues
}

export function generateDrawingData(types, index) {
    const randomType = types[randomInteger(0, types.length - 1)]
    const urlKey = randomType.replace(' ', '_') + index.toString()
    const attribute_set_id = 2
    const attributeValues = generateAttributeValues(attribute_set_id)

    return {
        urlKey: urlKey,
        sku: urlKey,
        name: randomType[0].toUpperCase() + randomType.substr(1),
        attributeValues,
        attribute_set_id
    }
}

export function generateReadingData(index) {
    const name = faker.commerce.productName()
    const urlKey = name.toLowerCase().replace(' ', '_') + index.toString()
    const attribute_set_id = 3
    const attributeValues = generateAttributeValues(attribute_set_id)

    return {
        urlKey: urlKey,
        sku: urlKey,
        name: name,
        attributeValues,
        attribute_set_id
    }
}

export function generateProducts(count, type) {

    return new Array(count).fill({}).map((_, index) => {
        const data = type(index + 1)

        return {
            urlKey: data.urlKey,
            sku: data.sku,
            isEnabled: true,
            name: data.name,
            price: faker.commerce.price(),
            stockQuantity: randomInteger(0, 100),
            specialDiscountType: ['percent', 'amount'][randomInteger(0, 1)],
            specialDiscountValue: Math.random() > 0.5 ? randomInteger(1, 20) : 0,
            specialTaxRate: 21,
            shortDescription: faker.lorem.sentence(10),
            longDescription: faker.lorem.paragraph(10),
            baseImage: {
                url: CONFIG.API + '/images/1280x720.png'
            },
            thumbnailImage: {
                url: CONFIG.API + '/images/640x360.png'
            },
            otherImages: [
                {
                    url: CONFIG.API + '/images/1024x1024.png'
                },
                {
                    url: CONFIG.API + '/images/512x512.png'
                }
            ],
            soldAmount: randomInteger(0, 10),
            attributeValues: data.attributeValues,
            attribute_set_id: data.attribute_set_id
        }
    })
}

export function generateReviews(products, customers) {
    const reviews = []

    products.forEach((_, index) => {
        reviews.push({
            status: 'accepted',
            date: faker.date.past(),
            title: faker.lorem.sentence(10),
            content: faker.lorem.paragraph(10),
            rating: randomInteger(1, 10),
            customer_id: index + 1,
            product_id: index + 1
        })
    })

    return reviews
}

export function generateCartItems(customers, products) {
    const cartItems = []

    customers.forEach((_, index) => {
        const product_id = randomInteger(1, products.length)
        const randomProduct = products[product_id - 1]
        const quantity = randomInteger(1, 10)
        const originalValue = randomProduct.price * quantity
        const discountedValue = randomProduct.specialDiscountType === 'PERCENT' ? originalValue - originalValue * randomProduct.specialDiscountValue : originalValue - randomProduct.specialDiscountValue
        const subtotal = discountedValue > 0 ? discountedValue : originalValue
        const totalTax = subtotal * randomProduct.specialTaxRate / 100
        const total = subtotal + totalTax

        customers[index].totalTax += totalTax
        customers[index].subtotal += subtotal
        customers[index].total += total

        cartItems.push({
            quantity,
            totalTax,
            subtotal,
            total,
            customer_id: index + 1,
            product_id
        })
    })

    return cartItems
}

export function generateOrders(customers) {
    const orders = []

    customers.forEach((customer, index) => {
        orders.push({
            reference: Math.random().toString(36).substr(2).toUpperCase(),
            date: faker.date.past(),
            status: 'ordered',
            totalDelivery: 0,
            totalTax: customer.totalTax,
            subtotal: customer.subtotal,
            total: customer.total,
            customer_id: index + 1,
            address_id: index + 1
        })
    })

    return orders
}

export function generateOrderItems(cartItems) {
    return cartItems.map((cartItem) => ({
        quantity: cartItem.quantity,
        totalTax: cartItem.totalTax,
        subtotal: cartItem.subtotal,
        total: cartItem.total,
        order_id: cartItem.customer_id,
        product_id: cartItem.product_id
    }))
}

export function generateInvoices(orders) {
    return orders.map((order, index) => ({
        date: order.date,
        totalDelivery: order.totalDelivery,
        totalTax: order.totalTax,
        subtotal: order.subtotal,
        total: order.total,
        order_id: index + 1
    }))
}

const customers = [
    {
        email: 'deniss.strombergs@scandiweb.com',
        password: encryptPassword('Test12#$'),
        firstName: 'Deniss',
        lastName: 'Strombergs',
        totalTax: 73.5,
        subtotal: 350,
        total: 423.5
    },
    ...generateCustomers(100)
]

const customerCustomerGroups = generateCustomerCustomerGroups(customers)

const addresses = generateAddresses(customers)

const users = [
    {
        username: 'admin',
        email: 'admin@storefront.com',
        password: encryptPassword('Admin1234'),
        firstName: 'Admin',
        lastName: 'Admin'
    },
    {
        username: 'deniss',
        email: 'deniss.strombergs@scandiweb.com',
        password: encryptPassword('Test12#$'),
        firstName: 'Deniss',
        lastName: 'Strombergs'
    },
    ...generateUsers(8)
]

const pencils = generateProducts(20, (index) => generateDrawingData(pencilTypes, index))
const pens = generateProducts(20, (index) => generateDrawingData(penTypes, index))
const drawingAccessories = generateProducts(20, (index) => generateDrawingData(drawingAccessoryTypes, index))
const books = generateProducts(20, (index) => generateReadingData(index))
const comics = generateProducts(20, (index) => generateReadingData(index))
const products = [
    ...pencils,
    ...pens,
    ...drawingAccessories,
    ...books,
    ...comics
]

const reviews = generateReviews(products, customers)

export function generateProductCategories(products, offset, category_id) {
    const productCategories = []

    products.forEach((_, index) => {
        productCategories.push({
            product_id: index + 1 + offset,
            category_id
        })
    })

    return productCategories
}

const productCategories = [
    ...generateProductCategories(pencils, 0, 2),
    ...generateProductCategories(pencils, 0, 4),
    ...generateProductCategories(pens, 20, 2),
    ...generateProductCategories(pencils, 20, 5),
    ...generateProductCategories(drawingAccessories, 40, 2),
    ...generateProductCategories(drawingAccessories, 40, 6),
    ...generateProductCategories(books, 60, 3),
    ...generateProductCategories(books, 60, 7),
    ...generateProductCategories(books, 80, 3),
    ...generateProductCategories(books, 80, 8),
]

const cartItems = generateCartItems(customers, products)
const orders = generateOrders(customers)
const orderItems = generateOrderItems(cartItems)
const invoices = generateInvoices(orders)

export const DATA = [
    {
        modelName: 'User',
        modelData: users
    },
    {
        modelName: 'Attribute',
        modelData: attributes
    },
    {
        modelName: 'AttributeSet',
        modelData: attributeSets
    },
    {
        modelName: 'AttributeSetAttribute',
        modelData: attributeSetAttributes
    },
    {
        modelName: 'Block',
        modelData: blocks
    },
    {
        modelName: 'Category',
        modelData: categories
    },
    {
        modelName: 'Customer',
        modelData: customers
    },
    {
        modelName: 'Address',
        modelData: addresses
    },
    {
        modelName: 'CustomerGroup',
        modelData: customerGroups
    },
    {
        modelName: 'CustomerCustomerGroup',
        modelData: customerCustomerGroups
    },
    {
        modelName: 'Order',
        modelData: orders
    },
    {
        modelName: 'Invoice',
        modelData: invoices
    },
    {
        modelName: 'Page',
        modelData: pages
    },
    {
        modelName: 'Product',
        modelData: products
    },
    {
        modelName: 'CartItem',
        modelData: cartItems
    },
    {
        modelName: 'OrderItem',
        modelData: orderItems
    },
    {
        modelName: 'ProductCategory',
        modelData: productCategories
    },
    {
        modelName: 'Review',
        modelData: reviews
    },
    {
        modelName: 'Config',
        modelData: configs
    },
    {
        modelName: 'ShippingMethod',
        modelData: shippingMethods
    },
    {
        modelName: 'PaymentMethod',
        modelData: paymentMethods
    }
]

export default DATA
