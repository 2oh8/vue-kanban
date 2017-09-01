let Tasks = require('../models/comment')

module.exports = {
    boardLists: {
        path: '/boards/:boardId/lists/:listId/tasks/:taskId/comments',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Get task comments'
            Tasks.find({
                boardId: req.params.boardId,
                listId: req.params.listId,
                taskId: req.params.taskId
            })
                .then(comments => {
                    console.log('found comments')
                    console.log(comments)
                    console.log('this is the whole response object for this request')
                    console.log(res)
                    res.send(handleResponse(action, comments))
                }).catch(error => {
                    console.log('didnt find comments')
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