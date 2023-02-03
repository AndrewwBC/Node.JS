const {listUsers, getUserById} = require('../controllers/UserController');

const route = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: listUsers,
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: getUserById,
  },
];

module.exports = route