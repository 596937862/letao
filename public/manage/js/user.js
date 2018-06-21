$(function () {

  var page = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({

      type: "get",
      url: "/user/queryUser",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        $(".tbody").html(template("tpl", info))


        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: page,//当前页
          totalPages: Math.ceil(info.total/info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, p) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            page = p;
            render();
          }
        });

      }
    })
  };

  $(".tbody").on("click",".btn",function(){
    $("#editModal").modal("show");   
    var id = $(this).parent().data("id");
    var isDelete = $(this).hasClass("btn-success")?1:0;
    $(".btn_edit").off().on("click",function(){
      $.ajax({
        type:"post",
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function(info){
          if(info.success){
            $("#editModal").modal("hide");
            render();
          }
        }
      })
    });
  });
});
