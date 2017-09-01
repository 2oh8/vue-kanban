var models = require('../config/constants').models  
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
	text: { type: String, required: true },
    created: { type: String, default: new Date() },
    creatorId: {type: ObjectId, ref: models.user.name, required: true},
    // Relations
    commenterName: {type: String, default: ''},
    boardId: { type: ObjectId, ref: models.board, required: true },
    listId: { type: ObjectId, ref: models.list, required: true },
    taskId: { type: ObjectId, ref: models.task, required: true},
});

module.exports = mongoose.model(models.comment.name, schema);