const routes = require('next-routes')()

routes
  .add('/passwordBlocks/new', '/passwordBlocks/new')
  .add('/passwordBlocks/:address', '/passwordBlocks/show')
  //edit a password block
  .add('/passwordBlocks/:address/:id/edit', 'passwordBlocks/Edit/index')
  //add new password block
  .add('/passwordBlocks/:address/new', '/passwordBlocks/Edit/new')
  //new password block
  // .add('/passwordBlocks/:address/new', '/passwordBlocks/Edit/new')


module.exports = routes
