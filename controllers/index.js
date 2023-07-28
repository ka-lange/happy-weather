module.exports = {
    getIndex: async (req,res)=>{
        // res.render('index.ejs') //renders ejs file and reponds with it
        try{
            res.render('index.ejs')
        }catch(err){
            console.log(err)
        }
    },
    
}

