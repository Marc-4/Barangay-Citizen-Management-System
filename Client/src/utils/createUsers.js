import {faker} from '@faker-js/faker'

const createUsers = async () => {

    const formData = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        middleName: faker.person.middleName(),
        lastName: faker.person.lastName(),
        dateOfBirth: faker.date.birthdate(),
        placeOfBirth_city: faker.location.city(),
        placeOfBirth_province: faker.location.county(),
        placeOfBirth_country: faker.location.country(),
        sex: faker.person.sex(),
        civilStatus: Math.round(Math.random()) ? 'single' : 'married',
        occupation: faker.person.jobTitle(),
        citizenship: '',
        email: faker.internet.email(),
        address_streetName: faker.location.street(),
        address_houseNumber: faker.number.int({min: 100, max: 500}),
        address_subdivisionPurok: faker.number.int({min: 1, max: 3})
    }

      const route = `${import.meta.env.VITE_API_URL}/api/admin/${role}/register`
      const response = await fetch(route, {
        method: 'POST',
        body: formData,
        mode: 'cors',
        credentials: 'include',
      })

      console.log(response);
  }