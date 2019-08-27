var http = require('http');
var fs = require("fs");
var qs = require('querystring');

var MongoClient = require('mongodb').MongoClient;

var dbUrl = "mongodb://localhost:27017/";



http.createServer(function(request, response) {

	if(request.url === "/index"){
		sendFileContent(response, "web.html", "text/html");
	}
	else if(request.url === "/"){
		console.log("Requested URL is url" +request.url);
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
	} else if(request.url==="/login1"){
              
        if (request.method === "POST") {            // POST
            console.log("test");
        formData = '';
        msg = '';
        return request.on('data', function(data) {
          formData += data;
          console.log(formData);
          return request.on('end', function() {
            var user;
            user = qs.parse(formData); 
			
            msg = JSON.stringify(user);
            
            info=formData.split("&");   
            for(i=0; i<info.length; i++){
                
                var d=info[i].split("=");
                
                
            }
            
            console.log(d[0]);
            console.log(d[1]);
            
            stringMsg = JSON.parse(msg);
            MongoClient.connect(dbUrl, function(err, db) {

  					if (err) throw err;

  					var dbo = db.db("mydb");

  					var myobj = stringMsg;

  					dbo.collection("customers").insertOne(myobj, function(err, res) {

    				if (err) throw err;

    				console.log("1 record inserted");

    				db.close();

  					});

					});
            
            
           // request.writeHead(200, {
            //  "Content-Type": "application/json",
            //  "Content-Length": msg.length
           // });
            //return request.end("okok");
            response.end("okokss"); // parse back to client side.
          });

        });
        
        
      } else {
        //form = publicPath + "ajaxSignupForm.html";
        sendFileContent(response, "login.html", "text/html");
       
      }
              
	} else if(request.url==="/register"){
              
        if (request.method === "POST") {            // POST
            console.log("register");
        formData = '';
        msg = '';
        return request.on('data', function(data) {
          formData += data;
          return request.on('end', function() {
            var user;
            user = qs.parse(formData); 
            msg = JSON.stringify(user);
            
            info=formData.split("&");   
            for(i=0; i<info.length; i++){
                
                var d=info[i].split("=");
                
                
            }
            
            //console.log(d[0]);
            //console.log(d[1]);
            
            stringMsg = JSON.parse(msg);
            MongoClient.connect(dbUrl, function(err, db) {

  					if (err) throw err;

  					var dbo = db.db("mydb");

  					var myobj = stringMsg;

					var query = {login: user.login};
					dbo.collection("customers").find(query).toArray(function(err, res) {
					
    				if (err) throw err;

					if (res != ""){
						console.log(res + "Account name exist. Please change.");
						response.end("FAIL");
						
						db.close();
					} else {
						response.end("SUCCESS");
						
						dbo.collection("customers").insertOne(myobj, function(err, res) {
						if (err) throw err;

						console.log("1 record inserted");

						db.close();

						});
						
						//db.close();
					}
  					});
					
					
  					// dbo.collection("customers").insertOne(myobj, function(err, res) {

    				// if (err) throw err;

    				// console.log("1 record inserted");

    				// db.close();

  					// });

					}); // client end
            
            
           // request.writeHead(200, {
            //  "Content-Type": "application/json",
            //  "Content-Length": msg.length
           // });
            //return request.end("okok");
            //response.end("okokss"); // parse back to client side.
          });

        });
        
        
      } else {
        //form = publicPath + "ajaxSignupForm.html";
        sendFileContent(response, "register.html", "text/html");
       
      }
              
	}
	else if(request.url==="/login"){
              
        if (request.method === "POST") {            // POST
            console.log("login check"); // check 1
        formData = '';
        msg = '';
        return request.on('data', function(data) {
			console.log("login check 2");
          formData += data;
          console.log(formData);
          return request.on('end', function() {
            var user;
            user = qs.parse(formData);
            user.id = "123456";  // ????????????
            msg = JSON.stringify(user);
            
            // info=formData.split("&");  
            // console.log(info);

            // for(i=0; i<info.length; i++){
				// var d = info[i].split("=");
            // }
 
			
            // console.log(d[0]);
            // console.log(d[1]);
            
            stringMsg = JSON.parse(msg);
            MongoClient.connect(dbUrl, function(err, db) {

  					if (err) throw err;

  					var dbo = db.db("mydb");

  					var myobj = stringMsg;
					var query = {login: user.login, password: user.password};
			dbo.collection("customers").find(query).toArray(function(err, res) {

    				if (err) throw err;

					if (res != ""){
						console.log(res + "!!!!!!!!!!!!!!!!!!");
						response.end("SUCCESS");
						db.close();
					} else {
						response.end("FAIL");
						db.close();
					}
  					});

					});
            
            
           // request.writeHead(200, {
            //  "Content-Type": "application/json",
            //  "Content-Length": msg.length
           // });
            //return request.end("okok");
          });

        });
        
        
      } else {
        //form = publicPath + "ajaxSignupForm.html";
        sendFileContent(response, "login.html", "text/html");
       
      }
              
	}
	else if(request.url==="/dumpdata"){
              
        if (request.method === "POST") {            // POST
        formData = '';
        msg = '';
        return request.on('data', function(data) {
          formData += data;
          return request.on('end', function() {
            var user;
           
            MongoClient.connect(dbUrl, function(err, db) {
				
  					if (err) throw err;

  					var dbo = db.db("mydb");

  					var myobj = [
									{ login: 'aa', password: 'aa', topic:'Fry Rice', content:'1. Rice 2. Oil...', bookId:'2'},
									{ login: 'Peter', password: 'aa', topic:'Fry chicken', content:'1. chicken 2. Oil...', bookId:'3'},
									{ login: 'Amy', password: 'aaa', topic:'Boil egg', content:'1. egg 2. water...', bookId:'2'},
									{ login: 'Hannah', password: 'asd', topic:'Fry egg', content:'1.Egg 2.Oil 3.Pan', bookId:'1'},
									{ login: 'Michael', password: 'qwe', topic:'Fry Rice', content:'1. Rice 2. Oil...', bookId:'4'},
									// { login: 'Sandy', password: 'asd', topic:'Fry Rice', content:'1. Rice 2. Oil...', comment:'Good to eat'},
									// { login: 'Betty', password: 'asd', topic:'Fry Rice', content:'1. Rice 2. Oil...', comment:'Good to eat'},
									// { login: 'Richard', password: 'asd', topic:'Fry Rice', content:'1. Rice 2. Oil...', comment:'Good to eat'},
									// { login: 'Susan', password: 'asd', topic:'Fry Rice', content:'1. Rice 2. Oil...', comment:'Good to eat'},
									// { login: 'Vicky', password: 'asd', topic:'Fry Rice', content:'1. Rice 2. Oil...', comment:'Good to eat'},
									// { login: 'Ben', password: 'asd', topic:'Fry Rice', content:'1. Rice 2. Oil...', comment:'Good to eat'},
									// { login: 'William', password: 'asd', topic:'Fry Rice', content:'1. Rice 2. Oil...', comment:'Good to eat'},
									// { login: 'Chuck', password: 'Masd', topic:'Fry Rice', content:'1. Rice 2. Oil...', comment:'Good to eat'},
									// { login: 'Viola', password: 'Sasd', topic:'Fry Rice', content:'1. Rice 2. Oil...', comment:'Good to eat'}
								];
					dbo.collection("customers").insertMany(myobj, function(err, res) {
					if (err) throw err;
						console.log("Number of documents inserted: " + res.insertedCount);
					db.close();
					});			
					
					// var query = {login: user.login, password: user.password};
			// dbo.collection("customers").find(query).toArray(function(err, res) {

    				// if (err) throw err;

					// if (res != ""){
						// console.log(res + "!!!!!!!!!!!!!!!!!!");
						// response.end("SUCCESS");
						// db.close();
					// } else {
						// response.end("FAIL");
						// db.close();
					// }
  					// });

					});
            

          });

        });
        
        
      } else {
        
        sendFileContent(response, "dumpData.html", "text/html");
       
      }
              
	}
	
	else if(request.url==="/favlist"){
        
		if (request.method === "DELETE") {
			console.log("delete check 1"); // check delete
			formData = '';
			msg = '';
			return request.on('data', function(data) {
				console.log("delete check 2"); // check delete 2
				formData += data;
				console.log(formData);
				return request.on('end', function() {
					var user;
					user = qs.parse(formData);
					msg = JSON.stringify(user);
					stringMsg = JSON.parse(msg);
					MongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
						var dbo = db.db("mydb");

						var myobj = stringMsg;
						var query = {login: user.login, bookId: user.bookId};
						var newvalues = { $set: {login: user.login, bookId: ""} };
						dbo.collection("customers").updateOne(query, newvalues, function(err, obj) {
							if (err) throw err;
							console.log("1 document deleted");
							db.close();
						});

					});
					
				});
			});
		}
		else if (request.method === "PUT") {
			MongoClient.connect(dbUrl, function(err, db) {
				if (err) throw err;
				var dbo = db.db("mydb");
				//Find all documents in the customers collection:
				dbo.collection("customers").find({}).toArray(function(err, result) {
					if (err) throw err;
					console.log(result);
					var msg = JSON.stringify(result);
					response.end(msg);
					db.close();
				});
			});
		}
        else if (request.method === "POST") {            // POST
            console.log("login check"); // check 1
			formData = '';
			msg = '';
			return request.on('data', function(data) {
				console.log("login check 2");
				formData += data;
				console.log(formData);
				return request.on('end', function() {
					var user;
					user = qs.parse(formData);
					user.id = "123456";  // ????????????
					msg = JSON.stringify(user);
					
					// info=formData.split("&");  
					// console.log(info);

					// for(i=0; i<info.length; i++){
						// var d = info[i].split("=");
					// }
		 
					
					// console.log(d[0]);
					// console.log(d[1]);
					
					stringMsg = JSON.parse(msg);
					MongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
						var dbo = db.db("mydb");

						var myobj = stringMsg;
						var query = {login: user.login, password: user.password};
						dbo.collection("customers").find(query).toArray(function(err, res) {
							if (err) throw err;

							if (res != ""){
								console.log(res);
								response.end("SUCESS");
								db.close();
							} else {
								response.end("FAIL");
								db.close();
							}
						});

					});
					
					
				   // request.writeHead(200, {
					//  "Content-Type": "application/json",
					//  "Content-Length": msg.length
				   // });
					//return request.end("okok");
				});

			});
        
        
		} else {
			//form = publicPath + "ajaxSignupForm.html";
			sendFileContent(response, "favlist.html", "text/html");
		   
		}
	  
	  
              
	}
	else if(request.url==="/all_recipe"){
              
        if (request.method === "POST") {            // POST
            console.log("login check"); // check 1
        formData = '';
        msg = '';
        return request.on('data', function(data) {
			console.log("login check 2");
          formData += data;
          console.log(formData);
          return request.on('end', function() {
            var user;
            user = qs.parse(formData);
            user.id = "123456";  // ????????????
            msg = JSON.stringify(user);
            
            // info=formData.split("&");  
            // console.log(info);

            // for(i=0; i<info.length; i++){
				// var d = info[i].split("=");
            // }
 
			
            // console.log(d[0]);
            // console.log(d[1]);
            
            stringMsg = JSON.parse(msg);
            MongoClient.connect(dbUrl, function(err, db) {

  					if (err) throw err;

  					var dbo = db.db("mydb");

  					var myobj = stringMsg;
					var query = {login: user.login, password: user.password};
			dbo.collection("customers").find(query).toArray(function(err, res) {

    				if (err) throw err;

					if (res != ""){
						console.log(res);
						response.end("SUCESS");
						db.close();
					} else {
						response.end("FAIL");
						db.close();
					}
  					});

					});
            
            
           // request.writeHead(200, {
            //  "Content-Type": "application/json",
            //  "Content-Length": msg.length
           // });
            //return request.end("okok");
          });

        });
        
        
      } else {
        //form = publicPath + "ajaxSignupForm.html";
        sendFileContent(response, "all_recipe.html", "text/html");
       
      }

	}
	else if(/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else{
		console.log("Requested URL is: " + request.url);
		response.end();
	}
}).listen(9999)

function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}