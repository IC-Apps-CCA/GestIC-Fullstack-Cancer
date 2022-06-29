const UserService = require("./User");
const Service = require("./Service");
const db = require("../database/models");
const uuid = require("uuid");

class Event extends Service {
    constructor() {
        super("event");
    }

    assertStartEnd(start, end) {
        if (start > end) throw new Error("Event start > end.");
    }

    async insert({ token, ownerId, start, end, title, content }) {
        try {
            await super.insert({ token });

            const startDate = new Date(start);
            const endDate = new Date(end);

            this.assertStartEnd(startDate, endDate);
            const event = await db.event.create({
                id: uuid.v4(),
                owner: ownerId,
                start: startDate,
                end: endDate,
                title,
                content,
            });
            return event;
        } catch (err) {
            throw err;
        }
    }

    async update({
        token,
        id,
        ownerId,
        start = undefined,
        end = undefined,
        title = undefined,
        content = undefined,
    }) {
        try {
            let event = await super.update({ token, ownerId, id });

            if (start || end) {
                (start = start ? new Date(start) : event.start),
                    (end = end ? new Date(end) : event.end),
                    this.assertStartEnd(start, end);
            }
            await db.event.update(
                {
                    start,
                    end,
                    title: title ? title : event.title,
                    content: content ? content : event.content,
                },
                {
                    where: { id },
                }
            );
            event = await db.event.findByPk(id);
            return event;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Event;
