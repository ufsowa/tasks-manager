const express = require('express');
const cors = require('cors');
const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running on port ${process.env.PORT || 8000}`);
})

app.use((req, res) => {
    return res.status(404).send('Page Not Found');
})