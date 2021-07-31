
$(function () {

    //核心功能1：添加toDoList事件
    //  按下回车 把完整数据 存储到本地存储里面
    // 存储的数据格式  var todolist = [{title: "xxx", done: false}]
    load();     //在项目开始前需要在jquery上先加上load()渲染数据在网页上，否则页面一刷新时数据将不显示在页面中。
    $("#title").on("keydown", function (event) {

        //如果按下回车后（回车的ASCLL码值为13）将信息进行发布
        if (event.keyCode === 13) {

            if ($(this).val() === "") {
                alert("请输入您要的操作");
            } else {

                //1.获取本地数据,用getData（）函数来表示
                var local = getData();
                //2.把新添加的任务加入到本地数据，用var todolist = [{title: "xxx", done: false}]这种形式
                local.push({ title: $(this).val(), done: false })
                //3.保存加载的数据到本地中,用saveData(data)函数
                saveData(local);
                //4.渲染保存的数据到页面
                load();
                $(this).val("");
            }

        }

    });


    //核心功能2：删除toDoList事件
    $("ul,ol").on("click", "a", function (event) {

        //1.获取localstage中的数据
        var data = getData();
        //2.获取li中a的自定义索引id,用来标记要删除的li
        var index = $(this).attr("id");
        //3.用splice函数删除当前的小li
        data.splice(index, 1);
        //4.保存当前的数据到localstage中
        saveData(data);
        //5.重新渲染数据到网页上
        load();

    });

    //核心功能3：修改checkbox中的check属性，通过判断是否打勾来将已完成和未完成分配到不同的区域中
    $("ul,ol").on("click", "input", function () {
        //1.获取本地存储数据
        var data = getData();
        //2.从li中的结构内容中可知，可以通过获取其兄弟a的索引来获取checkbox的索引
        var index = $(this).siblings("a").attr("id");
        //3.修改对应数据属性 done 为当前复选框的checked状态。
        data[index].done = $(this).prop("checked");
        console.log(data);
        //4.保存本地存储
        saveData(data);
        //5.重新渲染
        load();
    });


    //getData函数，用来获取本地存储localStorage
    function getData() {
        //将获取的对象存储到data中进行判断
        var data = localStorage.getItem("todolist");
        //判断数据是否为空并输出数据
        if (data !== null) { //判断对象是否为空
            return JSON.parse(data);    //对象不为空则返回对象中的JSON字符串形式解析出来
        } else {
            return [];      //否则返回空对象
        }
    }

    //saveData函数，用来保存本地存储
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    //load函数，将数据渲染到页面
    function load() {
        var data = getData();   //获取本地数据

        $("ol,ul").empty();     //遍历前先清空ol和ul的数据
        var todoCount = 0;      //待办事项
        var doneCount = 0;      //已办事项


        //用来遍历data对象中的数据,其中i为索引值，n为遍历的数据值
        $.each(data, function (i, n) {
            if (n.done) {       //如果done为true的话，表示已经完成事件，将数据添加到完成的那部分
                $("ul").prepend("<li><input type='checkbox' checked ='checked'> <p>" + n.title + "</p> <a href='javascript:;'id=" + i + " ></a></li>")

                doneCount++;    //每办完一件事则加一
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                todoCount++;    //每添加一件事则加一
            }

        });

        //todolist右上角的事件个数
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }

})