const express = require('express');
const path = require('path');
const app =express();

const PORT = process.env.PORT||9000;



app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(require(`./routes/api/logger`));
app.use(`/`,require(`./routes/api/route`));

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});