const express = require('express');
const app = express();
const path = require('path'); //ensures an absolute path
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())
// To 'fake' put/patch/delete requests:
app.use(methodOverride('_method')) //to override using a query value 
// Views folder and EJS setup:
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Fake tweets database (array):
let tweets = [
    {
        id: uuid(), //generate unique id
        username: 'sallyjumpsalot',
        tweet: 'My name is Sally! And I love to jump'
    },
    {
        id: uuid(),
        username: 'coderman12',
        tweet: 'Once a year, execute age++'
    },
    {
        id: uuid(),
        username: 'DevelopmentDose',
        tweet: 'Hey everyone! GO FOLLOW MY ACCOUNT!'
    },
    {
        id: uuid(),
        username: 'doglover99',
        tweet: "I woofin' love dogs!"
    }
]

// INDEX - display all comments
app.get('/tweets', (req,res) => {
    res.render('tweets/index', { tweets }); //display index.ejs file and pass local variable 'tweets' to the view
})

// NEW - renders a form for new tweet
app.get('/tweets/new', (req, res) => {
    res.render('tweets/new'); //display new.ejs file
})

// CREATE - create new comment on server
app.post('/tweets', (req,res) => {
    const { username, tweet } = req.body; //declare username & tweet as body of request
    tweets.push({ username, tweet, id: uuid()});  // push to add to end of tweets array
    res.redirect('/tweets'); //redirect back to homepage
})

// SHOW - get details for one specific tweet
app.get('/tweets/:id', (req,res) => {
    const { id } = req.params; //declare id as requested parameter
    const tweet = tweets.find(t => t.id === id); //declare tweet as first tweet that has id matching the request
    res.render('tweets/show', { tweet }); //display show.ejs file
})

// EDIT - renders form to edit a specific tweet
app.get('/tweets/:id/edit', (req,res) => {
    const { id } = req.params;
    const tweet = tweets.find(t => t.id === id); //declare tweet as first tweet that has id matching the request    
    res.render('tweets/edit', { tweet });
})

// UPDATE - update specific tweet on server
app.patch('/tweets/:id', (req,res) => {
    const { id } = req.params;
    const foundTweet = tweets.find(t => t.id === id); //declare tweet as first tweet that has id matching the request   
    const newTweetText = req.body.tweet; //get new tweet text from req.body
    foundTweet.tweet = newTweetText; //update tweet with text from req.body
    res.redirect('/tweets'); //redirect back to homepage
})

// DELETE - deletes specific item on server
app.delete('/tweets/:id', (req,res) => {
    const { id } = req.params;
    tweets = tweets.filter(t => t.id !== id); //updates tweets array to only contain objects without the deleted ID 
    res.redirect('/tweets'); //redirect back to homepage

})

//On Port 3000 localhost:3000
app.listen(3000, () => {
    console.log("ON PORT 3000")
})