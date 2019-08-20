/* $(".question").hide();
$("#nextButton").hide();
$("#prevButton").hide(); */
createAgeRange();
$(".grouper").hide();

var results = [];
var $curr = $("#question1"); 
var i = 0; //Zaehlervariable für results
var fstres;
//var progress = $("progress"); Fortschrittsbalken

function createAgeRange(){
    $ul = $("#age-range");
    for (i=16; i<=99; i++){
        $ul.append("<li value='" + i + "'>" + i + "</li>");
    }
};

function submitForm(){
    $("#nextButton").fadeOut(1000);
    $(".grouper").fadeIn(500);
    $("#prevButton").addClass("question");
    i = i-1;
}
$("#startButton").on("click",function(){
    $(this).fadeOut(500);
    $curr.addClass("question").fadeIn(500);
    $("#nextButton").fadeIn(1000);
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
                res[j]=t+1;
                j = j+1;
            }
        }
    }
    else {
        if (ele[0].checked) {
            res = 1;
        } 
        else if (ele[1].checked) {
            res = 2;
        }
        else if (ele.length > 2 && ele[2].checked){
            res = 3;
        }
        else {
            alert("Please select!");
            return;
        }
    }
    results[i]=res;
    i = i+1;
    $curr.fadeOut(500);
    if ($curr.attr("id")=="question9"){
        submitForm();
        return;
    }
    $("#prevButton").fadeIn(500);
    if ($curr.attr("id")=="question7"&& ele[1].checked){
        $curr = $curr.next().next();
        i=i+1;
    }
    else {
        $curr = $curr.next();
    }
    $curr.addClass("question").fadeIn(500);
    console.log(results);
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
    if ($("input","#question7")[1].checked && $curr.attr("id")=="question9"){
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
    //console.log(divId);
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










    