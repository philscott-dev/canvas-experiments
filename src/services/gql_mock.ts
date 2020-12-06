export default `
  query GetMockData {
    allCompanies {
      id
      name
      industry
      employees {
        id
        firstName
        lastName
        address
        subordinates {
          firstName
          lastName
          address
        }
      }
    }
  }
`
