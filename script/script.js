// Function to add cross button at the end of the list
function addcross(li){
     var span = document.createElement("SPAN");
     var txt = document.createTextNode("\u00D7");
     span.className = "close";
     span.appendChild(txt);
     li.appendChild(span);
}

// adding cross at the end of the list
var listelement=document.getElementsByTagName("LI");
console.log(listelement);
for(let i=1;i<listelement.length;i++)
{
    addcross(listelement[i]);
}


// add button
var addbtn=document.getElementById('add');
addbtn.addEventListener('click',function(){
     var li=document.createElement("LI");
     var inptext=document.getElementById('inp').value;
     var t = document.createTextNode(inptext);
     li.appendChild(t);
     console.log(li);
     if (inptext === '') {
     alert("You must write something!");
     } else {
     document.getElementById("list").appendChild(li);
     }
     document.getElementById("inp").value ="";
     addcross(li);
},false);


// uncheck when clicked
var complist=document.getElementById("list");
complist.addEventListener('click',function(event){
     if(event.target.tagName=="LI")
     {
          event.target.classList.toggle('checked');
     }
     else if(event.target.tagName=="SPAN")
     {
          event.target.parentElement.remove();
     }
},false);

// clear all

var clearbtn=document.getElementById('clearAll');
console.log(clearbtn);

clearbtn.addEventListener('click',function(){
     var list=document.getElementsByTagName("LI");
     console.log(list);
     console.log(list.length);
     let s=list.length;
     for(let i=0;i<s;i++)
     {
          list[0].remove();
     }
},true);

setInterval(function(){
     var ulElements = document.getElementById('list');
     var displayVal = ulElements.children.length >1 ? 'block' : 'none';
     document.querySelector('.show_hide').style.display = displayVal;
},1);
