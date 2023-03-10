const users = require('../mocks/users');

const listUsers = (request, response) => {

  const {order} = request.query

  const sortedUsers = users.sort((a,b) =>{
    if(order === 'desc'){
      return a.id < b.id ? 1 : -1
    }
      return a.id > b.id ? 1 : -1
  })
  response.send(200, sortedUsers)

};

const getUserById = (request, response) =>{
  const { id } = request.params;

  const user = users.find((user) => user.id === Number(id));

  if(user){
   return response.send(200, user)
  } 
  response.send(400, { error: 'User not found'})

 
}

module.exports = {listUsers, getUserById};
