const express = require('express');
const cors = require('cors');
const  {generateFile}  = require('./generateFile.js');
const  {generateInputFile}  = require('./generateInput.js');
const  {executeCpp}  = require('./executeCpp.js');
const app=express();
app.use(cors());

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.post('/run', async (req,res)=>{
    const {language,code,input} = req.body;
    
    if(code === undefined){
        res.status(400).json({success: false ,message:'Code is required'});
    }

    try {
        const filePath = generateFile(language, code);
        const inputPath = await generateInputFile(input);
        const output1 = await executeCpp(filePath,inputPath)

        res.status(200).json({filePath,inputPath, output1});
    } catch (error) {
        res.status(500).json({success: false, message: "Error:" + error.message})
    }

})

app.listen(5000, ()=>{
    console.log('Server is listening on port 5000');
})