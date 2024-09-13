var http = require('http');  
var fs = require('fs');  
var qs = require('querystring'); 
 
http.createServer(function (req, res) {  
    if (req.method === 'GET') { 
        // Serve the form HTML file 
        fs.readFile('form.html', 'utf8', function (err, data) {  
            if (err) {        
                res.writeHead(404, {'Content-Type': 'text/html'}); 
                res.write("Error: File not found");  
                return res.end();  
            }    
            res.writeHead(200, {'Content-Type': 'text/html'}); 
            res.write(data);  
            return res.end();  
        });  
    } else if (req.method === 'POST') { 
        // Collect form data 
        let body = ''; 
        req.on('data', function (chunk) { 
            body += chunk; 
        }); 
         
        req.on('end', function () { 
            // Parse the form data 
            let formData = qs.parse(body); 
             
            // Log the form data to the console 
            console.log("Form Data Received:"); 
   
   
 
            console.log("First Name:", formData.firstname); 
            console.log("Last Name:", formData.lastname); 
            console.log("Email:", formData.email); 
            console.log("Password:", formData.password); 
            console.log("Confirm Password:", formData.confirm_password); 
             
            // Create a string to write to the text file 
            let outputData = `First Name: ${formData.firstname}\nLast Name: 
${formData.lastname}\nEmail: ${formData.email}\nPassword: 
${formData.password}\nConfirm Password: ${formData.confirm_password}\n\n`; 
 
            // Write the data to a text file 
            fs.appendFile('formData.txt', outputData, function (err) { 
                if (err) { 
                    res.writeHead(500, {'Content-Type': 'text/html'}); 
                    res.write("Error: Unable to save data");  
                    return res.end();  
                } 
                // Send a response back to the client 
                res.writeHead(200, {'Content-Type': 'text/html'}); 
                res.write("<h2>Form data saved successfully!</h2>");  
                return res.end();  
            }); 
        }); 
    } 
}).listen(8080);  
 
console.log('Server running at http://localhost:8080/'); 