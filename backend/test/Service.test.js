const request = require('supertest');
const app = require('../src/app');
const config = require('../src/config/database');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);


let coordToken = null;
let infoId = null;

describe('Testing Services routes', () => {

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

    it('Should get all Services', async () => {
        const res = await request(app)
            .get('/Service');
        expect(res.ok).toBeTruthy();
        expect(res.body instanceof Array).toBe(true);
    })

    it('Should create a Service', async () => {
        const res = await request(app)
            .post('/Service')
            .send({
                ownerId:"1"
            })
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'ownerId');
        infoId = res.body.id;
    })

    it('Should update a Service', async () => {
        const res = await request(app)
            .put('/Service')
            .send({
                ownerId:"15"
                })
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'ownerId');
        expect(res.body.content).toEqual('content');
    })

    it('Should get a Service by its id', async () => {
        const res = await request(app)
            .get('/Service/' + infoId)
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'ownerId');
    })

    it('Should delete a Service', async () => {
        const res = await request(app)
            .delete('/Service/' + infoId)
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        const resGet = await request(app)
            .get('/Service/' + infoId);
        expect(resGet.ok).toBeFalsy();
    })
})
