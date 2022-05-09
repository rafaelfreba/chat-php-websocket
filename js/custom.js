$(window).on('load',()=>{
    //WebSocet
    var conn = new WebSocket("ws://localhost:8080");
        conn.onopen = function (e) {
        //console.log("Connection established!");
    };

    conn.onmessage = function (e) {
      //console.log(e.data);
      showMessage('other', e.data);
    };

    $("#btn-send").on("click", () => {
      if ($("#msg").val() != "") {
        let data = {"name" : $("#name").val(), "msg" : $("#msg").val()}       
        data = JSON.stringify(data)
        conn.send(data)
        showMessage('me', data)
        $('#msg').val('')
      }
    });
})

function showMessage(how, data){

    data = JSON.parse(data)   

    $("#content").prepend(
      "<div class='"+ (how == "other" ? "d-flex justify-content-end" : "") +"'>"  +

        "<div class='box-msg p-3 " + how + "'>" +

          "<div>" +

            "<h5>"+
              "<i class='" + (how == "me" ? "far fa-comment fa-lg" : "fas fa-comment fa-lg") + "'></i> "
              + data.name + 
            "</h5>" +
            "<p>" + data.msg + "</p>" +
            
          "</div>" +

        "</div>" +
        
      "</div>"
    );
}