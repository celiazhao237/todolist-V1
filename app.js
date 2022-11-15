const express = require('express')
const bodyParse = require('body-parser')
const date= require(__dirname+'/date.js')
// console.log(date())

const app = express()
const items = ["Buy Food", "Cook Food", "Eat Food"]
const workItems =[]

app.set('view engine', 'ejs')
app.use(bodyParse.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/',function(req,res){

  let day = date.getDate()
  // let today = new Date() 
  // var currentDay = today.getDay()
  // var day=''
  // if(currentDay===6||currentDay===0){
  //   day='weekend'
  //   // res.render('list', {kindOfDay: day})
  // } else{
  //   day='weekday'
  //   // res.render('list', {kindOfDay: day})
  // } 
  // res.render('list', {kindOfDay: day})

  // switch (currentDay) {
  //   case 0:
  //     day='Sunday';
  //     break;
  //   case 1:
  //       day='Monday';
  //     break;
  //   case 2:
  //       day='Tuesday';
  //     break;
  //   case 3:
  //       day='Wednesday';
  //     break;
  //   case 4:
  //       day='Thursday';
  //     break;
  //   case 5:
  //       day='Friday';
  //     break;
  //   case 6:
  //       day='Saturday';
  //     break;

  //   default: 
  //   console.log('Error: current day is equal to: '+ currentDay);
  // }
  // console.log(day);
  // res.render('list', {kindOfDay: day})

  // let options = {
  //   weekday: 'long',
  //   day: 'numeric',
  //   month: 'long'
  // }
  // let day = today.toLocaleDateString('en-US',options)
  res.render('list', {listTitle: day, newListItems: items})
})

// app.post('/',function(req,res){
//   let item = req.body.newItem
//   //console.log(item)
//   // res.render('list', {newListItems: item})
//   items.push(item)
//   res.redirect('/')
// })

app.post('/',function(req,res){
  
  const item = req.body.newItem
  
  if(req.body.list === 'Work'){
    workItems.push(item)
    res.redirect('/work')
  }else{
    items.push(item)
    res.redirect('/')
  } 
})

app.get('/work',function(req,res){
  res.render('list', {listTitle: 'Work list', newListItems: workItems})
})

app.get('/about',function(req,res){
  res.render('about')
})

app.listen(3000,function(){
  console.log('server is running on port 3000')
})
