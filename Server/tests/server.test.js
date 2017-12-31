const expect = require('expect');
const request = require('supertest');


const {app} = require('./../server');
const {Todo} = require('./../Models/Todos');

//to test post method
// beforeEach((done) => {
//     Todo.remove({}).then(() => done())
// });

const todos=[{
    text:"First test to do"
},{
    text:"Second test todo"
}];


beforeEach((done)=>{
    Todo.remove({}).then(()=>{
       return Todo.insertMany(todos);
    }).then(()=>done());
});

describe("todos", () => {
    it("Should create a new todo", (done) => {
        var text = "text todo";

        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });
    it('Should not create todo with invalid body', (done) => {
         request(app)
             .post('/todos')
             .send({})
             .expect(400)
             .end((err, res) => {
                 if (err){
                     return done(err);
                 }
                 Todo.find().then((todo) => {
                     expect(todo.length).toBe(2);
                     done();
                    }).catch((e) => done(e));
             });
     });
});

describe('Get/todos',()=>{
    it("Should get all todos",(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.length).toBe(2)
        })
        .end(done);
    });
});