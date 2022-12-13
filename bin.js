connection.query("select * from inscriptions WHERE session = ?", req.session.user, function(error, result){
    if (error) console.log(error);
    result.push (formationsInscrites);
    for (let i = 0 ; i < formationsInscrites.length ; i++){
        connection.query("select * from formations WHERE Nomformation = ?", formationsInscites[i], function(error, result){
            if (error) console.log(error);
        });    
    }
});