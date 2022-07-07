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
    it("Should create a Complementary Activity",async () =>{
        const res = await request(app)
        .post('/ComplementaryActivities')
        .send({
            name: "Complementary",
            description: "Activity",
            group: "Group1", 
            hours: "00:00",
            start: "2021-06-22T00:00:01",
            end : "2021-06-22T00:00:01",
        })
        .set("Authorization",coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id','start','end','name','description','group','hours');
        infoId = red.body.id;
    })
    it("Should delete an Complementary Activity by it's id", async() =>{
        const res = await request(app)
            .delete('/ComplementaryActivities/' + itemId)
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        const resGet = await request(app)
            .get('/ComplementaryActivities/' + itemId);
        expect(resGet.ok).toBeFalsy();
    })
    it("Should delete all Complementary Activities", async()=>{
        const res = await request(app)
            .delete('/ComplementaryActivities/')
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();

        const resGetAll = await request(app)
            .get('/ComplementaryActivities/');
        expect(resGetAll.body).toHaveLength(0);
    })
})