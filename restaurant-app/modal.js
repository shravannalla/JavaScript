var modal=document.getElementById("myModal");
var span=document.getElementsByClassName("close")[0];
var span1=document.getElementsByClassName("close1")[0];
var overlay=document.getElementById("overlay");

function Button(){
    modal.style.display="block";
    overlay.classList.add("open");

    var content=document.getElementById("Tab");
    content.textContent="Table : "+this.id+" Billing Details";
    goForward(this.id);
}

function goForward(idOfClicked){
    var table=document.getElementById("mTable");

    while(table.childElementCount > 1){
        table.removeChild(table.lastChild);
        table.childElementCount--;
    }

    var i=idOfClicked-1;

    var uniqueItems=Tables[i].items.filter(function (elem, index, self){
        return index==self.indexOf(elem);
    })

    if(Tables[i].id==idOfClicked){
        for(var j=0;j<uniqueItems.length;j++){
            var tr=document.createElement("tr");
            var td1=document.createElement("td");
            var td2=document.createElement("td");
            var td3=document.createElement("td");
            var td4=document.createElement("td");
            var td5=document.createElement("td");
            var input=document.createElement("input");
            var del=document.createElement("button");
            var item=uniqueItems[j];
            var cost=costOfItem(item);

            tr.className="trm";
            del.className="delete fa fa-trash";
            td1.className="Sno";
            td1.textContent=""+(j+1);
            td2.textContent=item;
            td2.className="item";
            td3.textContent=cost;
            td3.className="price";

            input.setAttribute("type", "number");
            input.setAttribute("min", 1);
            var numOfServings=servings(i, item);


            input.addEventListener("change", function(){
                serving(this, Tables[i].id, Math.abs(this.value));
            });

            input.setAttribute("value",numOfServings);
            del.setAttribute("onclick", "deleteItem(this)");
            del.setAttribute("id", Tables[i].id);
            td4.appendChild(input);
            td5.appendChild(del);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            table.appendChild(tr);

            var gmodal=document.getElementById("GModal");
            var genBillBtn=document.getElementById("GenerateBill");

            genBillBtn.addEventListener("click",function(){ GenerateBill(idOfClicked); });
        }
    }
    var tb=Tables[i].TotalBill;
    document.getElementById("TB").innerHTML="Total Bill :"+tb;
}

function costOfItem(item){
    for(var i=0;i<MenuList.length;i++){
        if(MenuList[i].item_name==item){
            return MenuList[i].cost;
        }
    }
}

function servings(index, item){
    var count=0;
    for(var i=0;i<Tables[index].items.length;i++){
        if(Tables[index].items[i]==item)
        {
            count++;
        }
    }
    return count;
}

function update(){
    var update=document.getElementsByClassName("table-p");
    for(var i=0;i<update.length;i++){
        update[i].textContent="Rs. "+Tables[i].TotalBill+" No. of items"+Tables[i].numOfItems;
    }
}

var gmodal=document.getElementById("GModal");
var genBillBtn=document.getElementById("GenerateBill");

function GenerateBill(id){
    i=id-1;
    modal.style.display="none";
    gmodal.style.display="block";
    var tno=document.getElementById("tno");
    tno.innerHTML="Table :"+id;

    var Tbil=document.getElementById("TB").innerHTML;
    var Tbill=document.getElementById("Tbill");
    Tbill.innerHTML=" Pay the "+Tbil;

    Tables[i].TotalBill=0;
    Tables[i].numOfItems=0;
    Tables[i].items.length=0;

    var obj=JSON.parse(localStorage.getItem(Tables[i].name));
    for(j=0;j<obj.length;j++){
        obj[j].quantity=0;
    }

    localStorage.setItem(Tables[i].name, JSON.stringify(obj));
    update();
    document.getElementById(id).style.backgroundColor='white';
}

span.onclick=function(){
    modal.style.display="none";
    overlay.classList.remove("open");
}

span1.onclick=function(){
    gmodal.style.display="none";
    overlay.classList.remove("open");
}

function serving(thiss, tableId, value){

    var parent=thiss.parentElement.parentElement;
    console.log(thiss);
    console.log(thiss.parentElement);
    console.log(parent.innerHTML);

    var retrieveItemName=parent.innerHTML.split('>');
    console.log(retrieveItemName);
    var itemName=retrieveItemName[3].substring(0,retrieveItemName[3].length-4);

    Tables[tableId-1].items.push(itemName);
    Tables[tableId-1].numOfItems=Tables[tableId-1].items.length;
    var id=tableId;

    var obj=JSON.parse(localStorage.getItem('Table-'+id));

    for(i=0;i<obj.length;i++){
        if(obj[i].item==itemName){
            obj[i].quantity=value;
        }
    }

    localStorage.setItem('Table-'+id, JSON.stringify(obj));
    var tempTotal=0;
    for(i=0;i<obj.length;i++){
        tempTotal+=obj[i].quantity*obj[i].cost;
    }
    console.log(tempTotal);
    Tables[id-1].TotalBill=tempTotal;
    document.getElementById("TB").innerHTML="Total Bill :"+Tables[id-1].TotalBill;
    update();
}

function deleteItem(e){
    var DelRow=e.parentElement.parentElement;
    DelRow.remove();
    var price=DelRow.getElementsByClassName("price")[0].textContent;
    var p=parseInt(price);
    var item=DelRow.getElementsByClassName("item")[0].textContent;
    var ID=document.getElementById(e.id).id;

    var SerialNo=document.getElementsByClassName("Sno");
    for(var i=0;i<SerialNo.length;i++){
        SerialNo[i].textContent=i+1;
    }

    while(Tables[ID-1].items.indexOf(item) > -1){
        Tables[ID-1].items.splice(Tables[ID-1].items.indexOf(item), 1);
        Tables[ID-1].numOfItems--;
    }

    var obj=JSON.parse(localStorage.getItem('Table-'+ID));
    for(i=0;i<obj.length;i++){
        if(obj[i].item==item){
            obj[i].quantity=0;
        }
    }

    localStorage.setItem('Table-'+ID,JSON.stringify(obj));
    var tempTotal=0;
    for(i=0;i<obj.length;i++){
        tempTotal+=obj[i].quantity*obj[i].cost;
    }
    Tables[ID-1].TotalBill=tempTotal;
    document.getElementById("TB").innerHTML="Total Bill :"+Tables[ID-1].TotalBill;
    update();
}

overlay.addEventListener("click",()=>{
    overlay.classList.remove("open");
    modal.style.display="none";
    gmodal.style.display="none";
})