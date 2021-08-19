const {Router} = require('express') //Connect Router from express
const Todo = require('../models/Todo')//Connect model
const router = Router()// Create object Router
/*Route index*/
router.get('/', async (req, res) => {
    const crudmens = await Todo.find({}).lean()

    res.render('index', {
        title: 'Todos',//add title to page
        isIndex: true,
        crudmens
    })
})
/*Route Create*/
router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',//add title to page
        isCreate: true
    })
})
router.post('/create', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    })
    await todo.save()
    res.redirect('/')
})

router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)
    todo.completed = !!req.body.completed
    await todo.save()
    res.redirect('/')
})

router.get('/delete/:_id', async(req, res) => {
    const {_id}=req.params;
    Todo.deleteOne({_id})
        .then(()=>{
            res.redirect('/')
        })
        .catch((err)=>console.log(err));
});
module.exports = router //Export routes from this file