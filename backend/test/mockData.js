const faker = require('faker')

const getStore = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  password: faker.lorem.word(10),
  email: faker.internet.email(),
  name: faker.company.companyName(),
  address: faker.address.streetAddress(),
  types: faker.random.words(4).split(' '),
  country: faker.address.country(),
  city: faker.address.city(),
  location: {
    coordinates: [-5.0008, 34.0368]
  },
  userType: 'STORE'
})

const getUser = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  password: faker.lorem.word(10),
  email: faker.internet.email(),
  userType: 'USER'
})


module.exports = { getStore, getUser }
