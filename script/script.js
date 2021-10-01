function addListItem(data1){
     data1.forEach(function (arrayItem) {
          var x = arrayItem["mytask"];
          var li=document.createElement("LI");
          var inptext=x;
          var t = document.createTextNode(inptext);
          li.appendChild(t);
          if (inptext === '') {
          alert("You must write something!");
          } else {
          document.getElementById("list").appendChild(li);
          }
          document.getElementById("inp").value ="";
          addcross(li);
      });
}
fetch('/getbackenddata')
.then(response => response.json())
.then(data => addListItem(data));

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
for(let i=1;i<listelement.length;i++)
{
    addcross(listelement[i]);
}

// uncheck when clicked
var complist=document.getElementById("list");
complist.addEventListener('click',function(event){
     if(event.target.tagName=="LI")
     {
          event.target.classList.toggle('checked');
     }
     else if(event.target.tagName=="SPAN")
     {
          var str=event.target.parentElement.innerText;
          event.target.parentElement.remove();
          var x="";
          for(let i=0;i<=str.length-3;i++)
          {
               if(str[i]=='\\')
                    break;
               x+=str[i];
          }
          const data={
               'use': x
          };
          fetch('/apisend', {
               method: 'POST', 
               headers: {
                              'Content-Type': 'application/json',
                         },
               body: JSON.stringify(data),
          });
     }
},false);

// clear all

// var clearbtn=document.getElementById('clearAll');
// console.log(clearbtn);

// clearbtn.addEventListener('click',function(){
//      var list=document.getElementsByTagName("LI");
//      console.log(list);
//      console.log(list.length);
//      let s=list.length;
//      for(let i=0;i<s;i++)
//      {
//           list[0].remove();
//      }
// },true);

// setInterval(function(){
//      var ulElements = document.getElementById('list');
//      var displayVal = ulElements.children.length >1 ? 'block' : 'none';
//      document.querySelector('.show_hide').style.display = displayVal;
// },1);
