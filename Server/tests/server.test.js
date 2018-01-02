const expect = require('expect');
const request = require('supertest');
const {ObjectID}=require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../Models/Todos');

//to test post method
// beforeEach((done) => {
//     Todo.remove({}).then(() => done())
// });

const todos=[{
    _id:new ObjectID(),
    text:"First test to do",
    
    
},{
    _id:new ObjectID(),
    text:"Second test todo",
    completed:true,
    completedAt:12123

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


describe('get/todos/id',()=>{
    it("Should get todo",(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(todos[0].text);
       })
       .end(done);

    });
    it("Should get invalid error message",(done)=>{
        request(app)
        .get(`/todos/123`)
        .expect(404)
        .expect((res)=>{
            expect(res.body).toEqual({});
        })
        .end(done)
    });
    it("Should get invalid error message",(done)=>{
        var id=new ObjectID().toHexString();
        request(app)
        .get(`/todos/${id}`)
        .expect(400)
        .expect((res)=>{
            expect(res.body).toEqual({});
        })
        .end(done)
    });
});


describe('Delete/todos/:id',()=>{
    it('Should delete todos',(done)=>{
        
        request(app)
        .delete(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body._id).toBe(`${todos[0]._id.toHexString()}`);
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.findById(`${todos[0]._id.toHexString()}`).then(doc=>{
                expect(doc).toNotExist();
                done();
            }).catch((e) => done(e));
        })
    });
    it("Should get invalid error message",(done)=>{
        request(app)
        .delete(`/todos/123`)
        .expect(404)
        .expect((res)=>{
            expect(res.body).toEqual({});
        })
        .end(done)
    });
    it("Should get invalid error message",(done)=>{
        var id=new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${id}`)
        .expect(400)
        .expect((res)=>{
            expect(res.body).toEqual({});
        })
        .end(done)
    });
});

describe('Patch/todos/:id',()=>{
    it('Should update todos',(done)=>{
       request(app)
        .patch(`/todos/${todos[0]._id.toHexString()}`)
        .send({completed:true})
        .expect(200)
        .expect((res)=>{
            expect(res.body.completed).toBe(true);
            expect(res.body.completedAt).toBeA('number');
        })
        .end(done)
    });
    it("Should get invalid error message",(done)=>{
        request(app)
        .patch(`/todos/${todos[1]._id.toHexString()}`)
        .send({completed:false})
        .expect(200)
        .expect((res)=>{
            expect(res.body.completed).toBe(false);
            expect(res.body.completedAt).toNotExist();
        })
        .end(done)
    });
    
});