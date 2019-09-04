var results = [];
var $curr = $("#question1"); 
var i = 0; //Zaehlervariable für results
var fstres;
var progress = $(".progress");
var prev; 
var pcounter = $("#progressC");

createAgeRange();
$(".grouper").hide();
$(".question").hide();
$("#progressCol").hide();
$(document).ready(function(){
    var typed = new Typed("#points", {
        strings:["..."],
        backspeed:40,
        typeSpeed:100,
        backDelay: 2000,
        loop:true
    });
});

function createAgeRange(){
    $ul = $("#age-range");
    for (var v=16; v<=99; v++){
        $ul.append("<li value='" + v + "'>" + v + "</li>");
    }
};

function submitForm(){
    $("#nextButton").fadeOut(500, function(){
        $("#pcounter").html(i);
        $(".grouper").fadeIn();
        $("#prevButton").fadeOut();
        i = i-1;
    });
    
}

$("#startButton").on("click",function(){
    $(this).fadeOut(500, function(){
        $("#start").removeClass("col-md-auto ml-auto").addClass("offset-sm-1 offset-md-2");
        
        $("#nextButton").fadeIn();
        const element =$("#arrows1");
        element.addClass("animated bounceOutLeft").css("animation-duration","0.5s");//remove #col1 afterwards
        setTimeout(function(){
            $curr.fadeIn();
            $("#col1").addClass("d-none").fadeOut();
            $("#proceeds").removeClass("d-none");
        },500);
        $("#progressCol").removeClass("d-none").fadeIn();
        $("#letsstart").fadeOut();
        
    });
    /* console.log($("#progressCol")[0]); */
});

$("#age-range li").on("click",function(){
    fstres = $(this).val();
});

$("#nextButton").on("click",function(){
    var ele = $("input",$curr);
    var res = 0;
    if ($curr.attr("id")=="question1"){
        if (fstres != null){
            res = fstres;
        }
        else {
            alert("Please select!");
            return;
        }
    }
    else if ($curr.attr("id")=="question6"){
        var t;
        var j = 0;
        var res = []
        for (t= 0; t < ele.length;t++){ //fuelle Unterarray
            if (ele[t].checked){
                res[j]=t;
                j = j+1;
            }
        }
    }
    else {
        var flag = true;
        for (a=0; a < ele.length;a++){
            if (ele[a].checked){
                res = a;
                flag=false;
            }
        }
        if (flag){
            alert("Please select!");
            return;
        }
    }
    progress.css("width",$curr.attr("data-width")+"%"); //aktualisiere Fortschrittsbalken
    results[i]=res;
    i = i+1;
    prev = $curr;
    console.log(results);

    if ($curr.attr("id")=="question9"){ //beendete bei letzter Frage
        submitForm();
        $curr.fadeOut(500);
        return;
    }
    $("#prevButton").fadeIn(500);

    if (($curr.attr("id")=="question7" || $curr.attr("id")=="question4" )&& ele[1].checked){
        progress.css("width",$curr.next().attr("data-width")+"%");
        $curr = $curr.next().next();
        i=i+1;
    }

    else {
        $curr = $curr.next();
    }
    $("#pcounter").html(i); //verbleibende Fragen an User
    prev.fadeOut(500, function (){
        $curr.fadeIn();
    });
    
    
});

$("#prevButton").on("click",function(){
    var ele = $("input",$curr);
    var res = 0;
    if ($curr.attr("id") == "question2"){
        $("#prevButton").fadeOut(1000);
    }
    $curr.fadeOut(500);
    i = i-1;
    //verringere i, um doppelte Arrayergebnisse zu vermeiden
    if (($("input","#question7")[1].checked && $curr.attr("id")=="question9")||$("input","#question4")[1].checked && $curr.attr("id")=="question6"){
        console.log($curr.attr("id"));
        $curr = $curr.prev().prev();
        console.log($curr.attr("id"));
        i=i-1;
    }
    else {
        $curr = $curr.prev();
    }
    
    $curr.addClass("questions").fadeIn(500);
    console.log(results);
});

$(":checkbox").on("click", function() {  
    var divId = $curr.attr("id");
    if (divId != "question6"){
        $(":checkbox","#"+divId).not(this).prop('checked', false); 
        //erlaube nur eine Checkbox zum ankreuzen
    }
});

$('.dropdown').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropdown-menu').slideToggle(300);
});

$('.dropdown').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(300);
});

$('.dropdown .dropdown-menu li').click(function () {
    $(this).parents('.dropdown').find('span').text($(this).text());
    $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
});










    