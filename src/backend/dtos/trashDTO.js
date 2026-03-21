module.exports = class trashDTO {
    id;
    title;
    content;
    createdAt;
    updatedAt;

    constructor(model) {
        this.id = model.id
        this.title = model.title
        this.content = model.content
        this.createdAt = model.createdAt
        this.updatedAt = model.updatedAt
    }
}