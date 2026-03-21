const noteDTO = require("../dtos/noteDTO")
const trashDTO = require("../dtos/trashDTO")
const noteModel = require("../models/noteModel")
const trashModel = require("../models/trashModel")

class NoteService {
    async createNote(req, res) {
        try {
            const {title, content} = req.body
            const userId = req.user.id

            const note = await noteModel.create({
                user: userId,
                title: title,
                content: content,
            })

            const noteDto = new noteDTO(note)

            return res.status(201).json({
                message: 'note created!',
                note: noteDto
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'Помилка створення нотатки'
            })
        }
    }

    async updateNote(req, res) {
        try {
            const {id, title, content} = req.body
            const userId = req.user.id
            const updatedNote = await noteModel.findOneAndUpdate(
                {user: userId, _id: id},
                {
                    title: title,
                    content: content
                },
                {
                    new: true
                }
            )

            if (!updatedNote) {
                return res.status(404).json({
                    message: 'Нотатку не знайдено або у вас немає прав на її зміну'
                });
            }

            const noteDto = new noteDTO(updatedNote)

            return res.status(201).json({
                message: 'note updated!',
                note: noteDto
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'Помилка оновлення нотатки'
            })
        }
    }

    async getAllNote(req, res) {
        try {
            const userId = req.user.id

            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 9
            const skip = (page - 1) * limit

            const [notes, totalCount] = await Promise.all([
                noteModel.find({ user: userId })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),
                noteModel.countDocuments({ user: userId })
            ])

            const notesDto = notes.map(note => new noteDTO(note))

        return res.status(200).json({
            notes: notesDto,
            total: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page
        })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'помилка при отриманні нотаток'
            })
        }
    }

    async getNote(req, res) {
        try {
            const userId = req.user.id
            const noteId = req.params.id

            const note = await noteModel.findOne({user: userId, _id: noteId})
            if(!note) {
                return res.status(404).json({
                    message: 'нотатку не знайдено'
                })
            }

            const noteDto = new noteDTO(note)

            return res.status(200).json({
                note: noteDto
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'помилка при отриманні нотатки'
            })
        }
    }

    async pinNote(req, res) {
        try {
            const userId = req.user.id
            const {id, pin}= req.params
            const pinStatus = pin === 'true'

            const note = await noteModel.findOneAndUpdate(
                {
                    user: userId,
                    _id: id
                },
                {
                    isPinned: pinStatus
                },
                {
                    new: true
                }
            )
            if (!note) {
                return res.status(404).json({ message: 'Нотатку не знайдено' });
            }

            const noteDto = new noteDTO(note)

            return res.status(201).json({
                message: pinStatus === true ? 'note pinned!' : 'note unpinned',
                note: noteDto
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'помилка при закріпленні нотатки'
            })
        }
    }

    async searchNote(req, res) {
        try {
            const userId = req.user.id
            const query = req.query.text
            if (!query) {
                return res.status(200).json({ notes: [] });
            }

            const resultSearch = await noteModel.find({
                user: userId,
                title: { $regex: query, $options: 'i' } 
            }).limit(20);

            const noteDto = resultSearch.map(note => new noteDTO(note))

            return res.status(200).json({
                note: noteDto
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'помилка пошуку нотатки'
            })
        }
    }

    async toTrash(req, res) {
        try {
            const userId = req.user.id
            const noteId = req.params.id

            const note = await noteModel.findOne({user: userId, _id: noteId})
            if (!note) {
                return res.status(404).json({ message: 'Нотатку не знайдено' })
            }

            const trashNote = await trashModel.create({
                user: userId,
                title: note.title,
                content: note.content,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt
            })

            await noteModel.deleteOne({user: userId, _id: noteId})

            const trashDto = new trashDTO(trashNote)

            return res.status(201).json({
                message: 'Нотатку перенесено до смітника',
                note: trashDto
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'помилка при перенесенні нотатки у смітник'
            })
        }
    }

    async getAllNoteTrash(req, res) {
        try {
            const userId = req.user.id
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 9
            const skip = (page - 1) * limit;

            const [trashNotes, totalCount] = await Promise.all([
                trashModel.find({ user: userId })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),
                trashModel.countDocuments({ user: userId })
            ])

            const trashDto = trashNotes.map(note => new trashDTO(note))

            return res.status(200).json({
                notes: trashDto,
                total: totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'помилка при отриманні нотаток'
            })
        }
    }

    async getTrashNote(req, res) {
        try {
            const userId = req.user.id
            const noteId = req.params.id

            const note = await trashModel.findOne({user: userId, _id: noteId})
            if(!note) {
                return res.status(404).json({
                    message: 'нотатку не знайдено'
                })
            }

            const noteDto = new trashDTO(note)

            return res.status(200).json({
                note: noteDto
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'помилка при отриманні нотатки'
            })
        }
    }

    async backToNotes(req, res) {
        try {
            const userId = req.user.id
            const trashId = req.params.id
    
            const trashNote = await trashModel.findOne({ _id: trashId, user: userId })
            
            if (!trashNote) {
                return res.status(404).json({ message: 'Запис у смітнику не знайдено' })
            }
    
            const restoredNote = await noteModel.create({
                user: userId,
                title: trashNote.title,
                content: trashNote.content,
                createdAt: trashNote.createdAt, 
                updatedAt: trashNote.updatedAt
            })
    
            await trashModel.deleteOne({ _id: trashId })
    
            const noteDto = new noteDTO(restoredNote)
    
            return res.status(200).json({
                message: 'Нотатку відновлено!',
                note: noteDto
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Помилка при відновленні нотатки'
            })
        }
    }
    
    async deleteNote(req, res) {
        try {
            const userId = req.user.id
            const noteId = req.params.id

            const noteData = await trashModel.deleteOne({user: userId, _id: noteId})
            if (noteData.deletedCount === 0) {
                return res.status(404).json({
                    message: 'Нотатку не знайдено або у вас немає прав на її видалення'
                });
            }

            return res.status(200).json({
                message: 'нотатку видалено',
                noteData: noteData
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'помилка при видаленні нотатки'
            })
        }
    }

    async searchTrashNote(req, res) {
        try {
            const userId = req.user.id
            const query = req.query.text
            if (!query) {
                return res.status(200).json({ notes: [] });
            }

            const resultSearch = await trashModel.find({
                user: userId,
                title: { $regex: query, $options: 'i' } 
            }).limit(20);

            const noteDto = resultSearch.map(note => new trashDTO(note))

            return res.status(200).json({
                note: noteDto
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'помилка пошуку нотатки'
            })
        }
    }
}

module.exports = new NoteService()