/* eslint-disable camelcase */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dbConn = require("../../config/db.config");

const authModel = {
  postNewUser: (body) => {
    return new Promise((resolve, reject) => {
     dbConn.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER(${dbConn.escape(
          body.email
        )});`,
        [body.email],
        (_err, data) => {
        if (data.length) {
          reject(new Error("account is ready"));
        } else {
          console.log("postNewUser", data);
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              reject(err);
            }
            const { email, password, phone_number, name } = body;
            console.log(body);
            bcrypt.hash(password, salt, (err, hashedPassword) => {
              if (err) {
                reject(err);
              }
              dbConn.query(
                `INSERT INTO users (email, password, phone_number, name) VALUES (${dbConn.escape(
                  email
                )}, ${dbConn.escape(hashedPassword)},${dbConn.escape(
                  phone_number
                )},'${name}')`,
                [email, password, phone_number, name],
                (err, data) => {
                  if (!err) {
                    const payload = {
                      email,
                      password: hashedPassword,
                    };
                    const token = jwt.sign(payload, process.env.SECRET_KEY, {
                      expiresIn: "1h",
                    });
                    const id = data.insertId;
                    resolve({ token, id });
                  } else {
                    reject(err);
                  }
                }
              );
            });
          });
        }
        }
      );
    })
  },
  loginUser: (body) => {
    return new Promise((resolve, reject) => {
      dbConn.query(
        `SELECT * FROM users WHERE email = ${dbConn.escape(body.email)};`,
        [body],
        (err, data) => {
          if (err) {
            reject(err);
          }
          console.log(data[0]?.password);
          if (data.length <0) {
            reject(new Error("password wrong"));
          } else {
            bcrypt.compare(body.password, data[0]?.password, (err, result) => {
              console.log(result)
              if (result) {
                const { email } = body;
                const { password, id } = data[0];
                const payload = {
                  email,
                  password,
                };
                const token = jwt.sign(payload, process.env.SECRET_KEY, {
                  expiresIn: "1h",
                });
                resolve({
                  id,
                  email,
                  token,
                });
              }
              if (!result) {
                reject(new Error("data password salah"));
              }
              if (err) {
                reject(err);
              }
            });
          }
        }
      );
    })
  }
}

module.exports = {
  authModel
}
