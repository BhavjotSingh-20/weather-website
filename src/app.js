const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode  = require('./geocode');
const forecast = require('./forecast');const app = express();
//Define path for express config
console.log(__dirname);
console.log(path.join(__dirname,'../public'));
const partialsPath = path.join(__dirname,'../templates/partials');
//For handle bars
app.set('views', path.join(__dirname, '../templates/views'));
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')));

app.get('',(req,res) => {
    res.render('index',{
        title:'weather App',
        name:'Bhavjot Singh'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'About me',
        name:'Bhavjot Singh'
    });
})

app.get('/help',(req,res) => {
    res.render('help', {
        title:'Help Page',
        help:'Press F1 for Help',
        name:'jashan'
    })
})
app.get('/help/*',(req,res) => {
          res.render('404',{
              title:'404',
              name:'Bhavjot Singh',
              errorMessage:'Help Page not Found'
          })
})

app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error:'Please provide a location'
        })    
    }
    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
           if(error) {
               return res.send({error});
           }                 
           forecast(latitude,longitude,(error,forecastData) => {
               if(error) {
                   return res.send({error});
               }
               res.send({
                   forecast:forecastData,
                   location:location,
                   address:req.query.address
               })
           })
    })
    // res.send({
    //     forecast:'it is snowing',
    //     location:'London', 
    //     address:req.query.address
    ///
})


// app.get('/products',(req,res) => {
//     if(!req.query.search) {
//         return res.send({
//            error:'You must provide a search term'
//        })
//     }
  
//     res.send({
//         products:[]
//     }) 
// })
app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Bhavjot Singh',
        errorMessage:'Page not Found'
    })
})
//app.com
//app.com/help
//app.com/about 


//Starting server
app.listen(3000, () => {
    console.log('Hey there Server is up at port 3000');
});
