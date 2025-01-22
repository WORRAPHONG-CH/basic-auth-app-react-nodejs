import express, {Request,Response} from "express"; // for making RESTAPI
import bodyParser from "body-parser"; // get body from request
import mysql from 'mysql2/promise'; // connect and manage to database
import jwt, { decode } from 'jsonwebtoken'; // encrypt and attach with token when login sucess
import cookieParser from 'cookie-parser'; // For use and save cookie
import session from 'express-session'; // For login and incase use session save identity 
import bcrypt from 'bcrypt'; // For hasing(one-way encryption) password
import cors from 'cors';
import dotenv from 'dotenv'; // for import env file

import {Users,UserLogin} from './interface';

dotenv.config();
const app = express(); // for handle server
const PORT = 8002; // use expose port
// const secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY as string : undefined // For encrypt and decrypt JWT Token
const secretKey = process.env.SECRET_KEY as string // For encrypt and decrypt JWT Token

// Ensure the secret key is defined
if(!secretKey){
    throw new Error("Secret Key is not defined");
}

// Middleware => runs before response 

app.use(bodyParser.json()); // Get json body from request
app.use(cookieParser());
app.use(
    cors({
        credentials:true,
        origin:["http://localhost:8002",] // allow only this request to get data
    }),
);
app.use(
    session({
        secret:"secret",
        resave:false,
        saveUninitialized:true,
    }),
);



// Initalize database (connect nodejs to mysql)
let mySQLConnection:any = null;
const initMySQL = async () =>{
    try{
        // wait for connect to my sql
        mySQLConnection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT,10) : undefined
        })
        console.log('Connect mySQL successfully');

    }catch(error:unknown){
        if(error instanceof Error){
            
            console.log(`ERROR:${error.message}`);
        }
        else{
            console.log(`Internal Server Error`);
        }
    }
}


// API ROUTING


// test api 
app.get('/',async (req:Request,res:Response)=>{
    res.status(200).send("WELCOME TO BASIC AUTHENTICATION");
});

// Get all users from mysql database [test]
app.get('/api/users-test', async (req:Request,res:Response)=>{
    try{
        const [results] = await mySQLConnection.query('SELECT * FROM users');
        
        // no data found
        if(!results){
            throw('data not found');
        }
        res.status(200).json({results});
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({error:error.message});
        }
        else{
            res.status(500).json({error:"Internal Server Error"});
        }
    }
});

// Register API => record new user to database 
app.post('/api/register', async (req:Request,res:Response)=>{
    // Get data from request
    const {name,email,password} = req.body; // Destructuring get user and password from request body(json)
    console.log(`Name:${name} Email:${email} Password:${password}`);

    // Check duplicated email
    const [userData] = await mySQLConnection.query('SELECT * FROM users WHERE email = ?',email);
    console.log(userData); // get => [ { id: 1, email: 'test1@gmail.com', password: '1234' } ]
    
    // Email found (user data has length in array length >=1)
    if(userData.length){
        res.status(400).json({message:"This email is already registered"}); // status 400 => 
        return; // End this code
    }
    // Hash password before insert new data 
    // salt => a random number increase complexible to encrpyt password, use to decrypt with hash and stored in hash function
    const hashPassword = await bcrypt.hash(password,10)

    // create an object for insert new user
    const insertData:Users = {
        name,
        email,
        password:hashPassword
    }

    // Try to insert new users, if email not found
    try{
        const [results] = await mySQLConnection.query('INSERT INTO users SET ?',insertData) // insert data into database 
        // console.log(results);
        res.status(201).json({message:"Insert Ok",user:insertData});

    }catch(error:unknown){
        if(error instanceof Error){
            res.status(500).json({error:error.message});
        }else{
            res.status(500).json({error:"Internal Server Error"});
        };
    };
});

// Login API => to identify user email,password in database
app.post('/api/login', async (req:Request,res:Response)=>{
    try{
        // Get data from request body (json)
        const {name,email,password} = req.body; // [object destructuring]
        console.log(`login: ${name} ${email} ${password}`);

        // Select user data from database 
        const [results] = await mySQLConnection.query('SELECT * FROM users WHERE email=?',email);
        const user = results[0]; // array object [ {email,password}, {SQL information..} ]
        console.log(results);

        // Check password using bcrypt compare(boolean)
        const match = await bcrypt.compare(password,user.password); // (password from body, password in database)
        
        // Send error if login fail
        if(!match){
            res.status(400).json({message:"Invalid email or password"})
            return 
        }
        // If login success
        
        // Create JWT Token to identyfy user
        const jwtToken = jwt.sign({email:user.email,role:"admin"},secretKey,{expiresIn:"1h"}); // payload, secretKey, additional options

        // 1. Attach JWT token with header (user identity)
    
        res.status(200).json({message:"Login Successfully",jwtToken});

    }catch(error:unknown){
        if(error instanceof Error){
            res.status(400).json({error:error.message});
        }else{
            res.status(500).json({error:"Internal Server Error"});
        };
    };
});

// GET all users as "Admin" role After login
app.get('/api/users', async (req:Request,res:Response)=>{
    try{
        // Get jwt token from headers ( Bearear type => start token with bearear + jwt token)
        const authHeader = req.headers['authorization']; // key in headers
        // console.log("authHeader:",authHeader);

        // Token that attach with headers need to split "bearear" out
        let authToken = ''
        if(authHeader){
            authToken = authHeader.split(' ')[1] // Split with space and select last one(token section)
        }
        // console.log("Auth Token",authToken);

        // Verify JWT token with secretKey
        const decodePayload = jwt.verify(authToken,secretKey); // Decrypt jwt payload

        // Recheck type of jwt decoded
        if(typeof decodePayload === "string" || !('email' in decodePayload)){
            res.status(400).json({message:"Invalid token payload"});
            return
        }

        const user = decodePayload as UserLogin;
        console.log("user:",user);

        // Recheck if the email exists in the da        
        const [checkEmail] = await mySQLConnection.query('SELECT * FROM users WHERE email = ? ',[user.email]);

        if(!checkEmail[0]){
            res.status(404).json({message:"User not found"})
            return;
        }

        // Check role (if found user)
        if(user.role !== 'admin'){
            res.status(401).json({message:"Unauthorized"});
            return;
        }

        // Query all user from database [ Already identify secure user ]
        const [results] = await mySQLConnection.query('SELECT * FROM users');
        
        // RESPONSE 
        res.status(200).json({users:results});

        res.status(200).json()

    }catch(error:unknown){
        if(error instanceof Error){
            res.status(400).json({error:error.message});
        }else{
            res.status(500).json({error:"Internal Server Error"});
        };
    };
});

app.get('/api/user/:id',async (req:Request,res:Response)=>{
    try{
        const userID  = req.params; // Get params from url
        console.log(userID);

        // Query Data from database
        const [results] = await mySQLConnection.query('SELECT * FROM users WHERE id = ?',[userID]);

        res.status(200).json({user:results});

    }catch(error:unknown){
        if(error instanceof Error){
            res.status(400).json({error:error.message});
        }
        else{
            res.status(500).json({error:"Internal Server Error"});
        }
    }
})


// START SERVER AT PORT 8002
app.listen(PORT, async ()=>{
    // initialize connect to my sql
    initMySQL();
    console.log(`START SERVER AT localhost:${PORT}`);
})