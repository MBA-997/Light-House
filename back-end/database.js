const express = require("express");
const mysql = require("mysql");
const app = express();
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { title } = require("process");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lighthousedb",
});

// db.connect((err) => {
//   if (err) throw err;
//   console.log("Connected");
//   db.query("CREATE DATABASE lighthousedb;", (err, result) => {
//     if (err.errno == 1007) {
//       console.log("Already Exists");
//       return;
//     }
//     if (err) throw err;
//     console.log("DATABASE CREATED");
//     console.log(result);
//   });
// });

const createCustomer = `Create table customer(
    cust_id int not null auto_increment primary key,
    password varchar(100) not null,
    email varchar(50) not null unique,
    phone varchar(15) not null unique,
    address varchar(200) not null,
    city varchar(50) not null,
    state varchar(50) not null,
    cnic varchar(20) not null unique,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    is_subscribed boolean not null default 0
);`;

const createItems = `Create table Items(
    item_ID int not null auto_increment primary key,
    title varchar(100) not null unique,
    price int not null,
    stock int not null,
    rating float not null,
    category varchar(50) not null,
    image varchar(500) not null unique
);`;

const createCoupons = `Create table Coupons(
    coupon_ID int not null auto_increment primary key,
    coupon_code varchar(100) not null,
    discount int not null,
    date_valid date not null
    );`;

const createTrackPurchases = `Create table TrackPurchases(
    tracking_id int not null auto_increment primary key,
    purchase_state varchar(50) not null default "Preparing"
);`;

const createPaymentMethod = `Create table PaymentMethod(
    payment_id int not null auto_increment primary key,
    payment_type varchar(50) not null
);`;

const createPurchases = `Create table Purchases(
    invoice_ID int not null auto_increment primary key,
    cust_id int not null,
    payment_id int not null,
    tracking_id int not null,
    coupon_id int,
    date_Purchased date not null,
    amount_due int not null,
    is_paid boolean not null,
    foreign key(cust_id) references Customer(cust_id),
    foreign key(payment_id) references PaymentMethod(payment_id),
    foreign key(tracking_id) references TrackPurchases(tracking_id),
    foreign key(coupon_id) references Coupons(coupon_id)
    );`;

const createPurchaseItems = `Create table PurchaseItems(
    invoice_id int not null,
    item_id int not null,
    valid_return_date date not null,
    quantity int not null,
    price int not null,
    primary key(invoice_id,item_id),
    foreign key(item_id) references Items(item_id),
    foreign key(invoice_id) references Purchases(invoice_id)
);`;

const createItemReviews = `Create table ItemReviews(
    item_ID int not null,
    invoice_ID int not null,
    date_Reviewed date not null,
    text varchar(200) not null,
    rating int not null,
    primary key(item_ID,invoice_ID),
    foreign key(item_id) references Items(item_id),
    foreign key(invoice_id) references Purchases(invoice_id)
);`;

const createReturns = `Create table Returns(
    item_ID int not null,
    invoice_ID int not null,
    date_Returned date not null,
    refund_amount int not null,
    is_Returned boolean not null,
    primary key(item_ID,invoice_ID),
    foreign key(item_id) references Items(item_id),
    foreign key(invoice_id) references Purchases(invoice_id)
);`;

db.query(createTrackPurchases, (err, result) => {
  if (err) {
    if (err.errno == 1050) {
      console.log("Table Already Exists");
      return;
    }
  }
  if (err) throw err;
  console.log(result);
  console.log("Table Created TrackPurchases");
});

db.query(createCustomer, (err, result) => {
  if (err) {
    if (err.errno == 1050) {
      console.log("Table Already Exists");
      return;
    }
  }
  if (err) throw err;
  console.log(result);
  console.log("Table Created");
});

db.query(createCoupons, (err, result) => {
  if (err) {
    if (err.errno == 1050) {
      console.log("Table Already Exists");
      return;
    }
  }
  if (err) throw err;
  console.log(result);
  console.log("Table Created");
});

db.query(createItems, (err, result) => {
  if (err) {
    if (err.errno == 1050) {
      console.log("Table Already Exists");
      return;
    }
  }
  if (err) throw err;
  console.log(result);
  console.log("Table Created");
});

db.query(createPaymentMethod, (err, result) => {
  if (err) {
    if (err.errno == 1050) {
      console.log("Table Already Exists");
      return;
    }
  }
  if (err) throw err;
  console.log(result);
  console.log("Table Created");
});

db.query(createPurchases, (err, result) => {
  if (err) {
    if (err.errno == 1050) {
      console.log("Table Already Exists");
      return;
    }
  }
  if (err) throw err;
  console.log(result);
  console.log("Table Created");
});

db.query(createPurchaseItems, (err, result) => {
  if (err) {
    if (err.errno == 1050) {
      console.log("Table Already Exists");
      return;
    }
  }
  if (err) throw err;
  console.log(result);
  console.log("Table Created");
});

db.query(createItemReviews, (err, result) => {
  if (err) {
    if (err.errno == 1050) {
      console.log("Table Already Exists");
      return;
    }
  }
  if (err) throw err;
  console.log(result);
  console.log("Table Created");
});

db.query(createReturns, (err, result) => {
  if (err) {
    if (err.errno == 1050) {
      console.log("Table Already Exists");
      return;
    }
  }
  if (err) throw err;
  console.log(result);
  console.log("Table Created");
});

app.post("/register", async (req, res) => {
  console.log("input", req.body);
  const email = req.body.email;
  const phone = req.body.phone;

  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const fname = req.body.fname;
  const lname = req.body.lname;

  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const cnic = req.body.cnic;

  const sql =
    "INSERT INTO Customer (Password,Email,Phone,Address,City,State,CNIC,First_name,Last_name) Values(?,?,?,?,?,?,?,?,?);";
  db.query(
    sql,
    [hash, email, phone, address, city, state, cnic, fname, lname],
    (err, result) => {
      if (err) {
        console.log(err);

        if ((err.errno = 1062)) {
          errorMessageEnd = err.sqlMessage.indexOf(" for ");
          return res
            .status(200)
            .send(err.sqlMessage.substring(0, errorMessageEnd));
        }
        res.status(400).send("Error Adding Data");
      } else {
        res.send({ insertId: result.insertId });
        // res.send("Values Inserted");
        console.log("CValues Inserted");
      }
    }
  );
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const hash = await bcrypt.hash(password, 10);
  console.log(email, password, hash);
  db.query(
    "SELECT * FROM Customer WHERE email=?",
    [email],
    async (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        // console.log(result[0].Password);

        const validPass = await bcrypt.compare(password, result[0].password);
        console.log(validPass);
        if (validPass) {
          console.log(result);
          // res.send(result).status(200);
          delete result[0].password;
          res.status(200).send(result[0]);
        } else {
          console.log("wrong username pass");
          // res.send({ message: "Wrong Username/Password" }).status(200);
          res.status(200).send({ message: "Wrong Username/Password" });
        }
      } else {
        console.log("wrong username");
        // res.send({ message: "Wrong Username/Password" }).status(200);
        res.status(200).send({ message: "Wrong Username/Password" });
      }
    }
  );
});

/*app.get("/add", (req, res) => {
  console.log("input", req.body);
  const title=req.body.title;
  const price=req.body.price;
  const stock=req.body.stock;
  const category=req.body.category;
  const rating=req.body.rating
  const image=req.body.image
  
  const sql="INSERT INTO Items (title,price,stock,rating,category,image) Values(?,?,?,?,?,?);"
  db.query(
    sql,
    [title,price,stock,rating,category,image],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ insertId: result.insertId });
        // res.send("Values Inserted");
        console.log("CValues Inserted");
      }
    }
  );
});

app.put("/edit", async (req, res) => {
  console.log("input", req.body);
  const title=req.body.title;
  const price=req.body.price;
  const stock=req.body.stock;
  const category=req.body.category;
  const rating=req.body.rating
  const image=req.body.image
  
  const sql="INSERT INTO Items (title,price,stock,rating,category,image) Values(?,?,?,?,?,?);"
  db.query(
    sql,
    [title,price,stock,rating,category,image],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ insertId: result.insertId });
        // res.send("Values Inserted");
        console.log("CValues Inserted");
      }
    }
  );
});*/

app.get("/light/:email", async (req, res) => {
  const email = req.params.email;
  console.log(email);
  db.query("SELECT * FROM Customer WHERE email=?", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      console.log("Sent");
      res
        .status(200)
        .send({ fname: result[0].first_name, lname: result[0].last_name });
    }
  });
});

app.get("/light/lights/:sorter/:limiter", (req, res) => {
  const toSort = req.params.sorter.length > 0 ? req.params.sorter : "RATING";
  let limit = 10;
  /* db.query(`SELECT COUNT(*) AS "total" FROM ITEMS;`,(err,result)=>{
    if(err) {console.log(err);res.send({err:err});}
    limit=result[0].total;

  }) */
  console.log("ALL LIGHTS");
  if (req.params.limiter.length > 0) {
    limit = parseInt(req.params.limiter);
  }
  db.query(
    "SELECT * FROM ITEMS ORDER BY ? DESC LIMIT ?",
    [toSort, limit],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      console.log("RESULT SENT");
      res.status(200).send(result);
    }
  );
});

app.get("/lights/purchases/:email", (req, res) => {
  const email = req.params.email;
  let emailFound = false;
  console.log(email);
  db.query("SELECT * FROM Customer WHERE email=?", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      console.log("Email Found!");
      //emailFound=true;
      db.query(
        "SELECT * FROM PURCHASES P JOIN CUSTOMER C ON P.CUST_ID=C.CUST_ID WHERE EMAIL=?;",
        email,
        (err, result) => {
          if (err) {
            res.send({ err: err });
          }
          return res.send(result);
        }
      );
    } else {
      console.log("NO SUCH EMAILS!");
    }
  });
});

app.get("/lights/trackpurchases/:email", (req, res) => {
  const email = req.params.email;
  let emailFound = false;
  console.log(email);
  db.query("SELECT * FROM Customer WHERE email=?", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      console.log("EMAIL FOUND IN TRACK PURCHASES");
      //emailFound=true;
      db.query(
        "SELECT * FROM PURCHASES P,CUSTOMER C,TrackPurchases T where P.CUST_ID=C.CUST_ID and P.Tracking_ID=T.Tracking_ID and  EMAIL=?;",
        email,
        (err, result) => {
          if (err) {
            res.send({ err: err });
          }
          if (result.length > 0) return res.send(result);
          else {
            res.send("NO PURCHASES MADE!");
          }
        }
      );
    } else {
      console.log("NO SUCH EMAILS FOUND!");
    }
  });
});

app.get("/Light/Items/Reviews/:Item_title", (req, res) => {
  const item_title = req.params.Item_title;
  db.query(
    "SELECT * FROM ITEMS WHERE UPPER(TITLE)=?",
    [item_title],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        //emailFound=true;
        db.query(
          "SELECT * FROM ITEMS I,ITEMREVIEWS R where I.item_ID=R.item_ID and  UPPER(title)=?;",
          item_title,
          (err, result) => {
            if (err) {
              res.send({ err: err });
            }
            if (result.length > 0) return res.send(result);
            else {
              res.send("NO REVIEWS YET!");
            }
          }
        );
      } else {
        res.send("NO SUCH ITEM EXISTS!");
      }
    }
  );
});

app.get("/Light/Items/:Item_title", (req, res) => {
  const item_title = req.params.Item_title;
  db.query(
    "SELECT * FROM ITEMS WHERE UPPER(TITLE)=?",
    [item_title],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        //emailFound=true;
        res.send(result);
      }
    }
  );
});

app.get("/light/returns/:emails", (req, res) => {
  const email = req.params.emails;
  //let emailFound=false;
  console.log(email);
  db.query(
    "SELECT * FROM PURCHASES P JOIN CUSTOMER C ON P.CUST_ID=C.CUST_ID WHERE EMAIL=?;",
    [email],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        //emailFound=true;
        db.query(
          "SELECT * FROM ITEMS I,RETURNS R, PURCHASES P,CUSTOMER C WHERE R.ITEM_ID=P.ITEM_ID AND R.INVOICE_ID=P.INVOICE_ID AND P.CUST_ID=C.CUST_ID AND EMAIL=?;",
          email,
          (err, result) => {
            if (err) {
              res.send({ err: err });
            }
            if (result.length > 0) return res.send(result);
            else {
              res.send("NO RETURNS YET!");
            }
          }
        );
      } else {
        res.send("NO PURCHASES!");
      }
    }
  );
});

//Purchase_Items POST after purchases
//Purchase POST
/*first get the payment method,post that..then put all the body details of purchase
get cust_id through email
payment_id through the payment_method post..Get its count after posting
tracking_id same as payment_id,
get coupon_id if there is a coupon_id --not null
date_Purchased that day's DATE,
amount_due depends on payment_type,
isPaid too
*/
app.post("/light/lights/purchase/:email", async (req, res) => {
  console.log("Purchase input", req.body);
  const email = req.params.email;
  const purchase_items = req.body.purchase_items;
  let purchased_prices = new Array();
  let purchased_ids = new Array();
  let purchased_stock = new Array();
  let invoice_ID = 0;
  /*
  Purchase_Items=[{
    title:
    stock:
  }]
  */
  //Payment Method
  const payment_type = req.body.payment_type;
  const coupon_code = null || req.body.coupon_code;
  let flag = true;
  let payment_id = 0;
  let tracking_id = 0;
  let cust_id = 0;
  let coupon_id = 0;
  let total_price = 0;
  let isPaid = 0;
  let amount_due = 0;
  //Payment_type
  //Title,Stock,Price
  if (coupon_code) {
    db.query(
      "Select coupon_id from coupons where coupon_code=? and date_valid>=CURDATE();",
      coupon_code,
      (err, result) => {
        if (err) {
          flag = false;
          console.log(err);
          res.send({ err: err });
          return;
        } else {
          console.log("Good Request for Coupons");
          if (result.length > 0) {
            flag = true;
            coupon_id = result.coupon_id;
          } else {
            flag = false;
            return res.status(200).send("There is no such coupon code");
          }
        }
      }
    );
  }
  if ((flag && !coupon_code) || (flag && coupon_id != 0)) {
    //Insert Payment Method
    db.query(
      "Insert into PaymentMethod(payment_type) values(?);",
      payment_type,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.send({ err: err });
        }
        //res.send({insertId:result.insertId})
        console.log("Values Inserted");
        payment_id = result.insertId;
      }
    );
    //Tracking
    db.query(
      "Insert into TrackPurchases(purchase_state) values('Preparing');",
      (err, result) => {
        if (err) {
          console.log(err);
          return res.send({ err: err });
        } else {
          //res.send({insertId:result.insertId})
          console.log("Values Inserted");
          tracking_id = result.insertId;
        }
      }
    );

    //Email
    db.query(
      "Select cust_id from Customer where email=?;",
      email,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.send({ err: err });
        } else {
          console.log("Email Recieved");
          cust_id = result.custid;
        }
      }
    );

    purchase_items.forEach((item) => {
      db.query(
        "Select item_id,price,stock from Items where title=?",
        item.item_title,
        (err, result) => {
          if (err) {
            console.log(err);
            return res.send({ err: err });
          } else {
            if (result.length > 0) {
              if (parseInt(result.stock) - parseInt(item.stock) < 0) {
                console.log("Not Enough Stock!");
                return res.status(400).send("OUT OF STOCK!");
              } else {
                purchased_prices.push(parseInt(result.price));
                purchased_ids.push(result.item_id);
                purchased_stock.push(parseInt(item.stock));
                total_price += parseInt(result.price) * parseInt(item.stock);

                //Update Stock
                db.query(
                  "Update Items set stock=? where item_id=?",
                  [
                    parseInt(result.stock) - parseInt(item.stock),
                    parseInt(result.item_id),
                  ],
                  (err, result) => {
                    if (err) {
                      console.log("Error Updating Items");
                      return res.send({ err: err });
                    }
                    console.log("Items Updated!");
                    //res.send(result);
                  }
                );
              }
            }
          }
        }
      );
    });

    //Purchase Insert
    if (payment_type == "COD") {
      isPaid = 0;
      amount_due = total_price;
    } else {
      isPaid = 1;
    }
    db.query(
      "Insert into Purchases(cust_id,payment_id,tracking_id,coupon_id,date_Purchased,amount_due,is_paid) values(?,?,?,?,CURDATE(),?,?)",
      [cust_id, payment_id, tracking_id, coupon_id, amount_due, isPaid],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.send({ err: err });
        } else {
          console.log("Purchase Values Inserted");
          invoice_ID = result.insertId;
          res.send({ insertId: result.insertId });
        }
      }
    );

    //Purchase_Items Input
    for (let i = 0; i < purchased_ids.length; i++) {
      db.query(
        "insert into Purchaseitems(invoice_id,item_id,valid_return_date,quantity,price) values(?,?,CURDATE()+14,?,?)",
        [invoice_ID, purchased_ids[i], purchased_stock[i], purchased_prices[i]],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.send({ err: err });
          } else {
            console.log("Purchase Items Values Inserted");
            //res.send({insertId: result.insertId})
          }
        }
      );
    }
  }
});

//Review POST
/*
item_title is also passed
check if that person has made a purchase of that specific item using the purchase part and item_part in purchase_items and checking that invoice with the email
check if there are no reviews by that person already=>item,reviews,cust
date_reviewed
text
rating
*/
app.post("/light/lights/review/:email", (req, res) => {
  const text = req.body.text;
  const rating = req.body.rating;
  const email = req.params.email;
  let invoice_id = 0;
  let item_id = 0;
  let flag = false;
  let ratings = 0;
  db.query(
    `Select U.invoice_id,U.item_id,I.rating from PurchaseItems U,Purchases P,Items I,Customer C where
  P.Cust_ID=C.Cust_ID and U.invoice_id=P.invoice_id and I.item_id=U.item_id and C.email=?`,
    email,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: err });
      }
      invoice_id = result.invoice_id;
      item_id = result.item_id;
      ratings = result.rating;
      console.log("Purchased");
      flag = true;
      let total = 0;
    }
  );
  if (flag) {
    console.log("Review Insertion");
    db.query(
      `Insert into ItemReviews(invoice_id,item_id,date_Reviewed,text,Rating)
    values(?,?,CURDATE(),?,?`,
      [invoice_id, item_id, text, rating],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send({ err: err });
        }
        console.log("Review Values Inserted");

        res.send({ insertId: result.insertId });
      }
    );
    db.query(
      'Select count(*) as "TOTAL" from itemreviews groupby(item_id) having item_id=?',
      item_id,
      (err, result) => {
        if (err) {
          console.log(err);
          res.send({ err: err });
        }
        total = result.total;
      }
    );
    db.query(
      `Update Items set rating=? where item_id=?`,
      [(ratings + rating) / total, item_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send({ err: err });
        }
        console.log("RATINGS UPDATED!");
      }
    );
  }
});

//app.post('light/lights/purchases/returns')

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("App is listening");
});
