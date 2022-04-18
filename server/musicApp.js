const express = require('express');
const songRouter=require('./routes/songRoute');
const PlayListRouter=require('./routes/playListRoute');
const userRouter=require('./routes/userRoute');

const app = express();
app.use(express.json());
app.use('/songs', songRouter);
app.use('/users', userRouter);
app.use('/playLists', PlayListRouter);





app.use((req, res, next) => {
    res.status(404).json({ error: req.url + ' API not supported!' });
});

app.use((err, req, res, next) => {
    if (err.message === 'NOT Found') {
        res.status(404).json({ error: err.message });
    } else {
        res.status(500).json({ error: err.message });
    }
});

app.listen(4040, () => console.log('listening to 4040...'));