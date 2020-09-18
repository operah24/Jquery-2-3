$(document).ready(function () {
    

    let todos;

    if(window.localStorage.getItem("todos") === null){
        todos = [];
        window.localStorage.setItem("todos",JSON.stringify(todos))
    }


    var $todosEX = window.localStorage.getItem("todos");
    todos = JSON.parse($todosEX);

    function addItem() {
        let $val = $("#addTask").val()
        if ($val !== '') {
            const $item = $("<li></li>").text($val);
            $item.append(`<a id="remove"><i class="fa fa-trash" aria-hidden="true"></i></a>`);
            $item.prepend(`<label><input type="checkbox" value="" class="checked"></label>`);
            $item.appendTo("ul");
            $("#addTask").val('');
            todos.push($val);
            window.localStorage.setItem("todos",JSON.stringify(todos))


            $(document).on('click', '#remove', function () {
                $(this).parent().remove()   
            })
            
        }


    }

    $("button").on("click", function () {
        addItem()
        
    })

    $("#addTask").on("keypress", function(e){
        if(e.keyCode === 13){
            addItem()
        }
    })
        

    










})