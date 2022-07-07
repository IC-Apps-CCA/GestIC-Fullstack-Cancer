const request = require('supertest');
const app = require('../src/app');
const config = require('../src/config/database');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);

let coordToken = null;
let itemId = null;

describe('Testing file routes',()=>{
    beforeAll(async()=>{
        const res = await request(app)
            .post('/access/login')
            .send({
                email: "coord1@ic.ufal.br",
                password: "1234"
            });
        coordToken = 'Bearer' + res.body.token;
    })

    afterAll(()=>{
        sequelize.close();
    })

    it('Should create a file', async()=>{
        const res = request(app)
        .post('/file')
        .send({
            name: "file 1",
            tag: "tag 1",
            ref: "ref 1",
        })
        .set('Authorization',coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('token','name','tag','ref');
        itemId = res.body.token;
    })
    
    it('Should get files', async () => {
        const res = await request(app)
            .get('/file')
            .send({
                token:itemId
            })
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('token','name', 'tag', 'ref');
    })
})