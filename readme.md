Upload helper v0.1
========
It is a plugin for resize,convert and compress the picture <br> so that it can be used as an avator
--------

##API

```javascript
uploadHelper(event,imgSize,returnType,callback)
```
###this is the function for resizing and compressing the picture
###param:
####event:
      the event of the filechange
####imgSize:
      [Object] the size of output picture,the obj has two key(width&height px), as it use canvas
      to draw a picture,more pixels means more storage peace.
####returnType['Blob' or 'DataUri']
      choose the type of output file.DataUri can be a value of img.src and Blob can be appended
      into formdata and post it.
#### callback(file)
     when the work is done,uploadHelper will run the callback with the result image file as arguments[0]
<br>
<br>
```javascript
fileToDataUrl(file[blob],callback)
```
###this is the function for converting blob to dataURI

##note:the demo will help you to know how to use it.
