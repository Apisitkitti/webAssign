var start = 0;
var Firstpage = 1;
var Secondpage =2;
function postFunction()
{
    var FirstTopic = document.getElementById("text1").value;
        if(start == 0)
        {
            document.getElementById("topic1").innerHTML = FirstTopic;
            start++;  
        }
        else if(start === Firstpage)
        { 
            document.getElementById("comment1").innerHTML = FirstTopic;
            start++;
        }
        else if(start === Secondpage)
        {
            document.getElementById("comment2").innerHTML = FirstTopic;
        }
    if(!FirstTopic)
    {
        alert("Test")
        start = 0;
    }

}
function clearFunction()
{
    document.getElementById("topic1").innerHTML = "";
    document.getElementById("comment1").innerHTML ="";
    document.getElementById("comment2").innerHTML ="";
    start = 0;

}
