import { gql, useMutation, useQuery } from '@apollo/client'

export const GET_ALL_SHIPPING_METHODS = gql`
    query GetAllShippingMethods {
        shippingMethods: allShippingMethods {
            id
            code
            name
        }
    }
`

export const GET_ALL_PAYMENT_METHODS = gql`
    query GetAllPaymentMethods {
        paymentMethods: allPaymentMethods {
            id
            code
            name
        }
    }
`

export const SUBMIT_ORDER = gql`
    query SubmitOrder(
        $addressId: ID!,
        $shippingMethodId: ID!,
        $paymentMethodId: ID!
    ) {
        reference: submitOrder(
            address_id: $addressId,
            shipping_method_id: $shippingMethodId,
            payment_method_id: $paymentMethodId
        )
    }
`

export const GENERATE_INVOICE = `
    mutation GenerateInvoice(
        $orderId: ID!,
    ) {
        status: generateInvoice(order_id: $orderId)
    }
`

export function GetAllShippingMethods() {
    const { loading, error, data: { shippingMethods } = {} } = useQuery(GET_ALL_SHIPPING_METHODS, {})

    if (loading || error) {
        return null
    }

    return shippingMethods
}

export function GetAllPaymentMethods() {
    const { loading, error, data: { paymentMethods } = {} } = useQuery(GET_ALL_PAYMENT_METHODS, {})

    if (loading || error) {
        return null
    }

    return paymentMethods
}

export function SubmitOrder(variables) {
    const { loading, error, data: { reference } = {} } = useQuery(SUBMIT_ORDER, { variables })

    if (loading || error) {
        return null
    }

    return reference
}
