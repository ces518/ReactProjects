const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/:tag', async (req, res, next) => {
    try {
        let where = {};
        if (parseInt(req.query.lastId, 10)) {
            where = {
                id: {
                    [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10),
                }
            };
        }

        const posts = await db.Post.findAll({
            where,
            include: [{
                model: db.Hashtag,
                where: {
                    name: decodeURIComponent(req.params.tag), // 한글, 특수문자는 URIComponent 로 변형되서넘어오기때문에 처리가필요
                },
            }, {
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model: db.Image,
            }, {
                model: db.User,
                through: 'Like',
                as: 'Likers',
                attributes: ['id'],
            }, {
                model: db.Post,
                as: 'Retweet',
                include: [{
                    model: db.User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: db.Image,
                }],
            }],
            order: [['createdAt', 'DESC']], // 등록일로 내림차순 정렬
            limit: parseInt(req.query.limit, 10),
        });
        console.log(posts);
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
