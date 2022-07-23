import { gql } from "@apollo/client";

export const GET_COUNTRY_CODES = gql`
query Query {
    countries {
      name
      code
    }
  }
`;


export const GET_COUNTRY_INDIA = gql`
query Query {
    country(code: "IN") {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

export const GET_COUNTRY_BY_CODE = gql`
query Query($code: ID!) {
    country(code: $code) {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;