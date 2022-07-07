const request = require('supertest');
const app = require('../src/app');
const config = require('../src/config/database');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);


let coordToken = null;
let infoId = null;

describe('Testing informatives routes', () => {

    beforeAll(async () =>{
        const res = await request(app)
            .post('/access/login')
            .send({
                email : "coord1@ic.ufal.br",
                password: "1234"
            });
        coordToken = 'Bearer ' + res.body.token;
    })

    afterAll(() => {
        sequelize.close();
    })
    it("Should create a Class Timetable",async () =>{
        const res = await request(app)
        .post('/ClassTimetable')
        .send({
            start_time:"2021-05-20T00:59:59",
            end_time:"2021-06-20T00:59:59",
            weekday:"Monday",
            offerId:"1"
        })
        .set("Authorization",coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id','start_time','end_time','weekday','offerId');
        infoId = red.body.id;
    })
    it("Should update an Class Timetable by it's id", async() =>{
        const res = await request(app)
            .put('/ClassTimetable')
            .send({
                id: itemId,
                end_time: "2021-06-22T00:59:59",
                weekday: "Sunday",
            })
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'start_time', 'end_time',
        'weekday', 'offerId');
        console.log(res.body.end_time);
        expect(new Date(res.body.end_time))
            .toEqual(new Date("2021-06-22T00:59:59"));
    })
    it("Should delete all Class Timetables", async()=>{
        const res = await request(app)
            .delete('/ClassTimetable/')
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();

        const resGetAll = await request(app)
            .get('/ClassTimetable/');
        expect(resGetAll.body).toHaveLength(0);
    })
})