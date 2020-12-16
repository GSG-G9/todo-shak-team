const request = require('supertest');
const app =require('../src/app');
const connection = require('../src/database/config/connection');
const build = require('../src/database/config/build')
const {getTodos ,getUserId, insertTodo , insertUser, deleteTodo , checkEmail} = require('../src/database/queries');


describe('routes testing', () =>{
  let token = '';
  beforeAll(()=> build());
  afterAll(()=> connection.end());

  test('get home testing', (done)=>{
    return request(app).get('/home')
    .expect('Content-Type', /html/)
    .end((err, res)=>{
      if (err) return done(err)
      expect(res.status).toBe(200)
      return done();

    })

  })

  test('POST /register Testing',(done)=>{
    return request(app).post('/register')
    .send({userName: "test", email:'testing@gmail.com', password:'s1457yf47kio', confirmPassword:'s1457yf47kio'})
    .expect(200,done)
  })

  test('POST /login Testing',(done)=> {
    return request(app).post('/login')
    .send({email:'testing@gmail.com', password:'s1457yf47kio'})
    .expect(200)
    .end((err,res)=>{
      if(err) return done(err);
      token = res.header["set-cookie"][0].split(';')[0].split('=')[1]; 
      return done();
    })
  })

  test('GET /todos Testing' , (done) =>{
    return request(app).get('/todos')
    .set('Cookie', [`userToken=${token}`]) 
    .expect(200,done)
  })

})