// let Lists = require('../models/list')

// module.exports = {
//   userBoards: {
//     path: '/boards/:boardId',
//     reqType: 'get',
//     method(req, res, next){
//       let action = 'Find Board Lists'
//       Lists.find({boardId: req.params.boardId})
//         .then(lists => {
//           res.send(handleResponse(action, lists))
//         }).catch(error => {
//           return next(handleResponse(action, null, error))
//         })
//     }
//   }
// }


// function handleResponse(action, data, error) {
//     var response = {
//       action: action,
//       data: data
//     }
//     if (error) {
//       response.error = error
//     }
//     return response
//   }