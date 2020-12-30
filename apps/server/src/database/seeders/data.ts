export const initialCountries = [
  { name: 'Ukraine' },
  { name: 'Russia' },
  { name: 'USA' }
]

export const initialPrices = [{ value: 100, discount: 0, currency: 'Dollar' }]
export const initialUsers = [
  {
    email: 'admin@ad.min',
    username: 'admin',
    password: 'admin',
    birthDate: new Date(),
    avatar: null
  }
]

export const initialRoles = [
  { name: 'Guest' },
  { name: 'User' },
  { name: 'Seller' },
  { name: 'Admin' }
]

export const initialPermissions = [
  { name: 'GODLY_PERMISSIONS' },
  { name: 'SELLER_PERMISSIONS' },
  { name: 'USER_PERMISSIONS' },
  { name: 'NO_PERMISSIONS' }
]
