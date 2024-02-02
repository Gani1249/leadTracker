
let myLeads=[];
const inputEl=document.getElementById("input-el");
const inputBtn=document.getElementById("input-btn");
const ulEl=document.getElementById("ul-el");
const deleteBtn=document.getElementById("delete-btn");
const tabBtn=document.getElementById("tab-btn");
/*
Ex let myleads=["www.google.com"];
Turn the myLeads string in to array
myLeads = JSON.parse(myLeads);
push a new value to the string
myLeads.push("www.lead2.com");
Turn the array in to the string
myLeads = JSON.stringify(myLeads);
log the typeof the string
console.log(typeof myLeads);
*/

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    //TO clear the input field
    inputEl.value="";
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    render(myLeads);
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads=[];
    render(myLeads);
})

const leadFromLocalStrorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadFromLocalStrorage){
    myLeads=leadFromLocalStrorage;
    render(myLeads);
}



//localStorage.setItem("myLeads","www.google.com");
//localStorage.getItem(myLeads);
//localStorage.clear();
//alert(leadFromLocalStrorage)

function render(leads){
    let listItems="";
    for(let i=0;i < leads.length;i++){
        listItems += `
                    <li>
                         <a  target='_blank' href='${leads[i]}'> ${leads[i]}
                        </a>
                    </li>
        `;
        /* Another way of writing code with using innerHTML
        ulEl.innerHTML += "<li>"+myLeads[i]+"</li>";
        without innerHTML
        const li=document.createElement("li");
        li.textContent = myLeads[i];
        ulEl.append(li);
        */
    }
    ulEl.innerHTML = listItems;
   
}

