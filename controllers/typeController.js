const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            if (!name) {
                return next(ApiError.badRequest('Имя типа не может быть пустым'));
            }
            const type = await Type.create({name});
            return res.json(type);
        } catch (error) {
            next(ApiError.internal('Ошибка при создании типа'));
        }
    }

    async getAll(req, res, next) {
        try {
            const types = await Type.findAll();
            return res.json(types);
        } catch (error) {
            next(ApiError.internal('Ошибка при получении типов'));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const type = await Type.destroy({ where: { id } });
            if (!type) {
                return next(ApiError.notFound('Тип не найден'));
            }
            return res.json({ message: 'Тип успешно удален' });
        } catch (error) {
            next(ApiError.internal('Ошибка при удалении типа'));
        }
    }
}

module.exports = new TypeController();
