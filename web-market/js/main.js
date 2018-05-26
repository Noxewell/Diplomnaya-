(function () {
  var months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
  ]

  var engine = {
    properties: [],
    add: function (path, price, date) {
      this.properties.push({
        path: path,
        price: price,
        date: new Date(date)
      })
    },
    sortByPrice: function () {
      // buble sort
      for (var i = 0; i < this.properties.length; i++) {
        for (var j = (i + 1); j < this.properties.length; j++) {
          if (this.properties[i].price > this.properties[j].price) {
            var next = this.properties[j]
            this.properties[j] = this.properties[i]
            this.properties[i] = next
          } 
        }
      }
    },
    sortByDate: function () {
      // buble sort
      for (var i = 0; i < this.properties.length; i++) {
        for (var j = (i + 1); j < this.properties.length; j++) {
          if (this.properties[i].date.getTime() > this.properties[j].date.getTime()) {
            var next = this.properties[j]
            this.properties[j] = this.properties[i]
            this.properties[i] = next
          } 
        }
      }
    },
    getTemplate(path, price, date) {
      return '<div class="col-lg-4 col-sm-6 col-md-4">\
      <div class="thumbnail">\
      <a href="#">\
      <img src="../img/' + path + '"></a>\
      <div class="caption">\
      <h3>T-Shirt</h3>\
      <hr>\
      <h3>Price: <span style="font-weight: bold;">' + price + '$</span></h3>\
      <h3>Date Added: ' + date.getDate() + ' ' + months[date.getMonth()] + '</h3>\
      <img src="../img/like.png" onclick="toggleLike(this)" data-like="notLiked">\
      </div>\
      </div>\
      </div>'
    },
    render: function (elem) {
      this.parent = elem
      var total = ''

      for (var i = 0; i < this.properties.length; i++) {
        total += this.getTemplate(this.properties[i].path, this.properties[i].price, this.properties[i].date) 
      }

      elem.innerHTML = total
    }

  }

  var toggled = false
  function toggleLike(elem) {
    if (toggled) {
      elem.setAttribute('src', '../img/like.png')
      toggled = false
    } else {
      elem.setAttribute('src', '../img/like-full.png')
      toggled = true
    }
  }

  function toggleMainLike(elem) {
    elem.setAttribute('src', '../img/navbar-like2.png')

    elem.onmouseout = function () {
      elem.setAttribute('src', '../img/navbar-like.png')
    }
  }

  var $price = document.getElementById('price')
  var $date = document.getElementById('date')

  $price.onclick = function () {
    engine.sortByPrice()
    engine.render(engine.parent)
  }

  $date.onclick = function () {
    engine.sortByDate()
    engine.render(engine.parent)
  }

  window.engine = engine
  window.toggleLike = toggleLike
  window.toggleMainLike = toggleMainLike
})()