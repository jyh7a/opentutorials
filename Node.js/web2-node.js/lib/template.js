module.exports = {
  html: function(title, list, body, control){
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8" /> 
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
    </body> 
    </html>`
  },
  list: function(files){
    let list = `<ul>`
    for(var i=0; i<files.length; i++){
      list += `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`
    }
    list += `</ul>`
    return list;
  }
}

// module.exports = template