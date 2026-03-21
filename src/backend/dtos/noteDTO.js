module.exports = class noteDTO {
    id;
    title;
    content;
    createdAt;
    updatedAt;
    isPinned;

    constructor(model) {
        this.id = model.id
        this.title = model.title
        this.content = model.content
        this.createdAt = model.createdAt
        this.updatedAt = model.updatedAt
        this.isPinned = model.isPinned
    }
}