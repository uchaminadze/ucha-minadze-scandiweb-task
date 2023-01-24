import { gql } from "@apollo/client";

export const ALL_PRODUCTS = gql`{
  categories{
    name
    products{
      id
      __typename @skip(if: true)
      name
      brand
      inStock
      gallery
      prices{
        amount
        currency{
          symbol
          label
        }
      }
      attributes{
        type
        name
        items{
          id
          __typename @skip(if: true)
          value
          displayValue
        }
      }
    }
  }
}`