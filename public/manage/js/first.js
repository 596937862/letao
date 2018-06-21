$(function () {

  var page = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({

      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        $(".tbody").html(template("tpl", info))
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
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

  $(".add_tips").on("click",function(){
    $("#addModal").modal("show");
    $(".btn_confirm").off().on("click",function(){
      $.ajax({
        type:"post",
        url:"/category/addTopCategory",
        data:$("form").serialize(),
        success:function(info){
          if(info.success){
            $("#addModal").modal("hide");
            render();
          }
        }
      })



    });



  });

});
