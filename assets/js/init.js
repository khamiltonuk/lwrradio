(function(){

    'use strict';

    var username = localStorage.getItem("localUsername"),
        retroMembers = [],
        $panels = $('.panel'),
        $overlay = $('.overlay'),
        uniqueId = 0,
        bankForm = '<li class="draft" draggable="true"><form id="blankItem" >' +
        '<input type="text" name="item" value="test"/>' +
        '<button type="submit" class="submit">Submit</button>' +
        //'<button class="edit hidden" aria-hidden="true">Edit</button>' +
        '<button class="delete hidden" aria-hidden="true" >delete</button>' +
        '</form></li>',
        inputValue;


    //getting the username
    $('#capture-username').on('submit', function(e){
        e.preventDefault();
        username = $('#m').val().trim();
        //exsistingUser = retroMembers[username].length;
        if (username !== "" ){//} && exsistingUser !== -1){
            localStorage.setItem('localUsername', username);
            closeOverlay();
            startRetroBoard();
        }else{
            $(this).addClass('animated shake');
            $('.error-messsage').removeClass('hidden').attr('aria-hidden', 'false');
        }
    });

    $('#m').on('focus', function(){
        $(this).siblings('label').addClass('active-input');
        $(this).attr('placeholder','');
    });

    $('#m').on('blur', function(){
        inputValue = $(this).val();
        if(inputValue === ""){
            $(this).siblings('label').removeClass('active-input');
            $(this).attr('placeholder','username');
        }
    });

    var startRetroBoard = function(){
        renderUsername();
        insertDraft();


        $('#retro-board').on('blur','.panel input', blurInput );
        $('#retro-board').on('keyup', 'input', activeItem );
        $('#reset-username').on('click', resetUsername );
    };





    var resetUsername = function(){
        if(username){
            localStorage.removeItem('localUsername');
        }
        openOverlay();
    };

    var blurInput = function(e){
        inputValue = $(this).val();
        if(inputValue === ""){
            $(this).parent().parent().remove();
        }
    };

    var activeItem = function(){
        $(this).parent().parent().removeClass('draft');
        insertDraft();
    };

    var insertDraft = function(){
        $panels.each(function(){
            uniqueId += 1;
            var draftCount = $(this).find('ul > li.draft').length;
            if(draftCount < 1){
                $(this).find('ul').append($(bankForm).attr('id', "item-"+ uniqueId ));
            }
        });
        matchPanelHeight();
    };

    var renderUsername = function(){
        $('.username span').text(username);
    };

    //Retroboard
    var matchPanelHeight = function(){
        var maxHeight = 0;
        $panels.height('auto');
        $panels.each(function(){
            if ($(this).outerHeight() > maxHeight){
                maxHeight = $(this).outerHeight();
            }
        });
        $panels.height(maxHeight);
    };

    //Utills
    var openOverlay = function(){
        $overlay.removeClass('hidden').attr('aria-hidden', 'true');
    };

    var closeOverlay = function(){
        $overlay.addClass('hidden').attr('aria-hidden', 'false');
    };

    var init = function(){
        //console.log("username: " + username);
        if(username){
            closeOverlay();
            startRetroBoard();
        }else{
            startRetroBoard();
        }
    };

    init();

    $('.example').on('dragstart', function(){
        //alert('hello2');
    });

    var droptarget = document.getElementById("droptarget1");

    droptarget.addEventListener('dragenter', dragEnter  , false);
    droptarget.addEventListener('dragleave', dragLeave  , false);
    droptarget.addEventListener('drop'     , drop       , false);

    /* Drop target event handlers */
    function dragEnter(event) {
        $(event.target).css({'background':"#ff0000"});
    }

    function dragLeave(event) {

        $(event.target).css({'background':"#fff"});
    }
    function drop(event) {
        console.log(event);
        console.log('event');
        event.target.style.border = "none";
        event.preventDefault(); // don't forget this!

    }




})();
