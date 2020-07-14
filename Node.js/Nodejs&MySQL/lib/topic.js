const db = require('./db')
const template = require("./template.js");
const url = require("url");
const qs = require("querystring");
const sanitizeHtml = require('sanitize-html')

exports.home = (request, response) => {
  db.query(`SELECT * FROM topic`, (error, topics)=>{
    if(error) throw error
    var title = "Welcome";
    var description = "Hello, Node.js";
    var list = template.list(topics);
    var html = template.HTML(
      title,
      list,
      `<a href="/create">create</a>`,
      `<h2>${sanitizeHtml(title)}</h2>${sanitizeHtml(description)}`
    );
    response.writeHead(200)
    response.end(html)
  })
}

exports.page = (request, response) => {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  db.query(`SELECT * FROM topic`, (error, topics)=>{
    if(error) throw error
    let query = db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id = ?`, [queryData.id], (error2, topic) => {
      if(error2) throw error2
      var title = topic[0].title
      var description = topic[0].description
      var list = template.list(topics)
      var html = template.HTML(
        sanitizeHtml(title),
        list,
        `<a href="/create">create</a>
        <a href="/update?id=${queryData.id}">update</a>
        <form action="delete_process" method="post">
          <input type="hidden" name="id" value="${queryData.id}">
          <input type="submit" value="delete">
        </form>`,
        `<h2>${sanitizeHtml(title)}</h2>
        ${sanitizeHtml(description)}
        <p>by ${sanitizeHtml(topic[0].name)}, ${sanitizeHtml(topic[0].profile)}</p>
        `
      );
      console.log(`query : `, query.sql)
      response.writeHead(200)
      response.end(html)
    })
  })
}

exports.create = (request, response) => {
  db.query(`SELECT * FROM topic`, (error, topics)=>{
    db.query('SELECT * FROM author', (error2, authors) => {
      if(error) throw error
      var title = "WEB - Create";
      var list = template.list(topics);
      var html = template.HTML(
        title,
        list,
        "",
        `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              ${template.authorSelect(authors)}
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `
      );
      response.writeHead(200)
      response.end(html)
    })
  })
}

exports.create_process = (request, response) => {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);
    db.query(`
      INSERT INTO topic (title, description, created, author_id) 
      VALUES (?, ?, NOW(), ?)`,
      [post.title, post.description, post.author],
      (error, result) => {
        if(error) throw error
        response.writeHead(302, { Location: `/?id=${result.insertId}` });
        response.end();
      }
    )
  })
}

exports.update = (request, response) => {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  db.query(`SELECT * FROM topic`, (error, topics) => {
    if(error) throw error
    db.query(`SELECT * FROM topic WHERE id = ?`, [queryData.id], (error2, topic) => {
      if(error2) throw error
      db.query('SELECT * FROM author', (error2, authors) => {
        var list = template.list(topics);
        var html = template.HTML(
          sanitizeHtml(topic[0].title),
          list,
          `<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`,
          `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${topic[0].id}">
              <p><input type="text" name="title" placeholder="title" value="${sanitizeHtml(topic[0].title)}"></p>
              <p>
                <textarea name="description" placeholder="description">${sanitizeHtml(topic[0].description)}</textarea>
              </p>
              <p>
                ${template.authorSelect(authors, topic[0].author_id)}
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `
        );
        response.writeHead(200);
        response.end(html);
      })
    });
  });
}

exports.update_process = (request, response) => {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);
    db.query('UPDATE topic SET title=?, description=?, author_id=? WHERE id=?',
     [post.title, post.description, post.author, post.id], (error, result) => {
      response.writeHead(302, { Location: `/?id=${post.id}` });
      response.end();   
     })
  });
}

exports.delete_process = (request, response) => {
  var body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      db.query('DELETE FROM topic WHERE id=?', [post.id], (error, result) => {
        if(error) throw error
        response.writeHead(302, { Location: `/` });
        response.end();
      })
    });
}