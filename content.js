(function () {
  var port = chrome.extension.connect({name: 'jf'}) ;
  port.onMessage.addListener( function (msg) {
    switch (msg[0]) {
      case 'NOT JSON':
        let i = 'asd'
        break ;
      default:
        throw new Error('Message not understood: ' + msg[0]) ;
    }
  });

  var bodyChildren = []
  var isInit = false
  var listContent = document.createElement('div')
  var imageList = []
  listContent.hidden = true

  function showOriginPage () {
    onOff()
  }

  function appendImage () {
    if (!imageList.length) {
      return
    }
    var src = imageList.shift()
    console.log(src)
    var div = document.createElement('div')
    listContent.append(div)
    var img = new Image()
    div.append(img)
    div.style = 'text-align:center;color:#999;padding-bottom:10px;'
    img.style = 'width: 1200px; height:auto'
    img.onload = function () {
      appendImage()
    }
    img.src = src
  }

  function showListPage () {
    var imageRootUrl = document.querySelector("#cover > a > img").attributes.src.nodeValue.replace('/t.', '/i.').replace('cover.jpg', '')
    var path = parseInt(document.querySelector("#info > div:nth-child(4)").innerText.split(' ')[0])
    onOff()
    if (!isInit) {
      isInit = !isInit
      for (var i = 1; i <= path; i++ ) {
        imageList.push(`${imageRootUrl}${i}.jpg`)
      }
      appendImage()
      appendImage()
      appendImage()
      appendImage()
      appendImage()
    }
  }

  function onOff () {
    listContent.hidden = !listContent.hidden
    bodyChildren.forEach(el => {
      el.hidden = !el.hidden
    })
    bodyChildren[0].hidden = false
  }

  function ready () {
    bodyChildren = document.body.childNodes
    var pre = bodyChildren[0]

    var toolbar = document.createElement('div')
    toolbar.id = 'n_reader_toolbar'

    var button = document.createElement('button')
    button.id = 'n_reader_buttonPlain' ;
    button.innerText = '滾動模式' ;
    
    var functionOn = false ;
    button.addEventListener(
      'click',
      function () {
        button.blur()
        if (!functionOn) {
          button.innerText = '原始模式'
          showListPage()
        } else {
          button.innerText = '滾動模式'
          showOriginPage()
        }
        functionOn = !functionOn ;
      },
      false
    ) ;
    toolbar.append(button)
    document.body.insertBefore(toolbar, pre) ;
    bodyChildren[0].append(listContent)

  }

  document.addEventListener("DOMContentLoaded", ready, false);
})();
