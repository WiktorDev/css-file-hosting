const fs = require('fs')

function makeid(length){
  var result= '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.createFile=(content, req, res)=>{
  var id = makeid(10);
  var url = config.base_url+id+".css";
  fs.writeFile(`./public/${id}.css`,content, function(result){
    res.render('status', {code: '404', message: "Plik zostal pomyslnie wyslany! Znajduje sie pod linkiem: <a href="+url+">"+url+"</a>"})
    console.log("Plik zostal wyslany!")
  })
}