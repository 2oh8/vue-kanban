let Tasks = require('../models/task')

module.exports = {
    boardLists: {
        path: '/boards/:boardId/lists/:listId/tasks',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Get list tasks'
            Tasks.find({
                boardId: req.params.boardId,
                listId: req.params.listId
            })
                .sort({created: -1})
                .exec((err, tasks) => {
                    console.log('found tasks')
                    console.log(tasks)
                    console.log(res)
                    res.send(handleResponse(action, tasks))
                }).catch(error => {
                    console.log('didnt find tasks')
                    return next(handleResponse(action, null, error))
                })
        }
    },

}

function handleResponse(action, data, error) {
    var response = {
        action: action,
        data: data
    }
    if (error) {
        response.error = error
    }
    return response
}