/**
 * Created by zhangdongming on 16-9-14.
 */
(function(){
    var uploadHelper=function(event,imgSize,returnType,callback) {
        var file=event.target.files[0];
        compressImage(file,imgSize,function (nDataUrl){
            if(returnType.toLowerCase()==='blob'){
                callback(dataURLtoBlob(nDataUrl));
            }else if(returnType.toLowerCase()==='datauri'){
                callback(nDataUrl);
            }else {
                callback('type illegal');
            }
        })
    };
    function compressImage(file,size,callback) {
        fileToDataUrl(file,function (dataUrl) {
            compressDataUrl(dataUrl,size,function (ndata) {
                callback(ndata);
            });
        })
    }
    var fileToDataUrl=function(file,callback) {
        var reader=new window.FileReader();
        reader.onload=function (e) {
            callback(e.target.result);
        };
        reader.readAsDataURL(file);
    };
    function compressDataUrl(dataURL,size,callback) {
        var img=new window.Image();
        img.src=dataURL;
        img.onload=function () {
            var canvas=document.createElement('canvas');
            var ctx=canvas.getContext('2d');   //创建绘图的上下文
            var oriWidth=img.width;
            var oriHeight=img.height;
            var cutW=img.width;
            var cutH=img.height;
            var oriRatio=oriWidth/oriHeight;   //需要的宽高比
            var cutL=0,cutT=0;
            canvas.width=size.width;
            canvas.height=size.height;
            var ratioReq=canvas.width/canvas.height; //要求的长宽比
            if(oriRatio>ratioReq){ //宽度过大，裁剪宽度
                var realWidth=oriHeight*ratioReq;               //重新对图像求宽度，使得宽高比可以符合canvas的比例
                cutL=(oriWidth-realWidth)/2;                 //计算裁剪开始坐标
                cutW=realWidth;                          //裁剪后宽度
            }else if(oriRatio<ratioReq){ //高度过大，需要裁剪高度
                var realHeight=oriWidth/ratioReq;
                cutT=(oriHeight-realHeight)/2;
                cutH=realHeight;
            }
            ctx.drawImage(img,cutL,cutT,cutW,cutH,0,0,canvas.width,canvas.height);
            var ndata=canvas.toDataURL('image/jpeg');
            callback(ndata);
        }
    }
    function dataURLtoBlob (dataURL) {
        var binaryString = atob(dataURL.split(',')[1]);
        var arrayBuffer = new ArrayBuffer(binaryString.length);
        var intArray = new Uint8Array(arrayBuffer);
        var mime = dataURL.split(',')[0].match(/:(.*?);/)[1];

        for (var i = 0, j = binaryString.length; i < j; i++) {
            intArray[i] = binaryString.charCodeAt(i);
        }
        var data = [intArray];
        return new Blob(data, { type: mime });
    }
    window.uploadHelper=uploadHelper;
    window.fileToDataUrl=fileToDataUrl;
})();