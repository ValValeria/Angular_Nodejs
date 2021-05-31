import {routes} from './route';
import {resolve} from 'path';

const  express = require('express');
const app = express();
const multer  = require('multer');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 8000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('public'))
  },
  fileFilter:function fileFilter (req, file, cb) {
    const mimetype:string = file.mimetype;

    if (mimetype.includes('image/') && file.size<8000) {
        cb(null,true);
    } else {
        cb(null,false);
    }
  },
  filename: function (req, file, cb) {
      cb(null, `${file.originalname}`)
  },
  })


const upload = multer({ storage: storage});

app.use(cors());
app.use(express.json());

if(Array.isArray(routes) && routes.length){
   for (const route of routes) {

       if (route.isCreate) {
        app[route.method](route.url,upload.array('photos',19),(req,resp,next)=>route.h(req,resp));
       } else {
        app[route.method](route.url,(req,resp,next)=>route.h(req,resp));
       }
   }
}

app.use('/public', express.static(resolve('public')));
app.use('/assets',express.static(resolve('public')));
app.use(express.static(resolve('dist/client')));

app.get('*',(req:any,resp:any)=>{
  resp.sendFile(resolve('dist/client/index.html'))
})

app.listen(port);
