var x=10,y=20;
$("table>tr>td>a[class=big]").mouseover(function(event){
    var src=this.href;
    var div=$("<div id='dt'><img src='"+src+"'></div>");
    $("body").append(div);
    $("#dt").css({
        "top":event.pageY+y,
        "left":event.pageX+x
    }).show();
}).mousemove(function(event){
    $("#dt").css({
        "top":event.pageY+y,
        "left":event.pageX+x
    })
}).mouseout(function(event){
    $("#dt").remove();
}).click(function preventDefault(event){
    var e=window.event;
    if(e.preventDefault)
        e.preventDefault();
    e.reurnValue=false;
});