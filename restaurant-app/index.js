//Data
var Tables=[
    {id:1, name:"Table-1", numOfItems:0, items:[], TotalBill:0},
    {id:2, name:"Table-2", numOfItems:0, items:[], TotalBill:0},
    {id:3, name:"Table-3", numOfItems:0, items:[], TotalBill:0}
];

localStorage.clear();

localStorage.setItem('Table-1', JSON.stringify([
    {'item':"Manchuria",'cost':120,'quantity':0},
    {'item':"Paneer Tikka",'cost':170,'quantity':0},
    {'item':"Noodles",'cost':120,'quantity':0},
    {'item':"Chicken Pakoda",'cost':160,'quantity':0},
    {'item':"Chicken Biryani",'cost':230,'quantity':0},
    {'item':"Mutton Biryani",'cost':260,'quantity':0},
    {'item':"Veg Biryani",'cost':200,'quantity':0},
    {'item':"Butter Naan",'cost':45,'quantity':0},
    {'item':"Rumali Roti",'cost':30,'quantity':0},
    {'item':"Tandoori Roti",'cost':30,'quantity':0},
    {'item':"Pulka",'cost':40,'quantity':0},
    {'item':"Thums Up",'cost':50,'quantity':0},
    {'item':"Mojito",'cost':110,'quantity':0},
    {'item':"Water Bottle",'cost':25,'quantity':0}
]));

localStorage.setItem('Table-2', JSON.stringify([
    {'item':"Manchuria",'cost':120,'quantity':0},
    {'item':"Paneer Tikka",'cost':170,'quantity':0},
    {'item':"Noodles",'cost':120,'quantity':0},
    {'item':"Chicken Pakoda",'cost':160,'quantity':0},
    {'item':"Chicken Biryani",'cost':230,'quantity':0},
    {'item':"Mutton Biryani",'cost':260,'quantity':0},
    {'item':"Veg Biryani",'cost':200,'quantity':0},
    {'item':"Butter Naan",'cost':45,'quantity':0},
    {'item':"Rumali Roti",'cost':30,'quantity':0},
    {'item':"Tandoori Roti",'cost':30,'quantity':0},
    {'item':"Pulka",'cost':40,'quantity':0},
    {'item':"Thums Up",'cost':50,'quantity':0},
    {'item':"Mojito",'cost':110,'quantity':0},
    {'item':"Water Bottle",'cost':25,'quantity':0}
]));

localStorage.setItem('Table-3', JSON.stringify([
    {'item':"Manchuria",'cost':120,'quantity':0},
    {'item':"Paneer Tikka",'cost':170,'quantity':0},
    {'item':"Noodles",'cost':120,'quantity':0},
    {'item':"Chicken Pakoda",'cost':160,'quantity':0},
    {'item':"Chicken Biryani",'cost':230,'quantity':0},
    {'item':"Mutton Biryani",'cost':260,'quantity':0},
    {'item':"Veg Biryani",'cost':200,'quantity':0},
    {'item':"Butter Naan",'cost':45,'quantity':0},
    {'item':"Rumali Roti",'cost':30,'quantity':0},
    {'item':"Tandoori Roti",'cost':30,'quantity':0},
    {'item':"Pulka",'cost':40,'quantity':0},
    {'item':"Thums Up",'cost':50,'quantity':0},
    {'item':"Mojito",'cost':110,'quantity':0},
    {'item':"Water Bottle",'cost':25,'quantity':0}
]));

var MenuList=[
    {id:1, item_name: "Manchuria", cost: 120, category:"starter"},
    {id:2, item_name: "Paneer Tikka", cost: 170, category:"starter"},
    {id:3, item_name: "Noodles", cost: 120, category:"starter"},
    {id:4, item_name: "Chicken Pakoda", cost: 160, category:"starter"},
    {id:5, item_name: "Chicken Biryani", cost: 230, category:"biryani"},
    {id:6, item_name: "Mutton Biryani", cost: 260, category:"biryani"},
    {id:7, item_name: "Veg Biryani", cost: 200, category:"biryani"},
    {id:8, item_name: "Butter Naan", cost: 45, category:"bread"},
    {id:9, item_name: "Rumali Roti", cost: 30, category:"bread"},
    {id:10, item_name: "Tandoori Roti", cost: 30, category:"bread"},
    {id:11, item_name: "Pulka", cost: 40, category:"bread"},
    {id:12, item_name: "Thums Up", cost: 50, category:"beverages"},
    {id:13, item_name: "Mojito", cost: 110, category:"beverages"},
    {id:14, item_name: "Water Bottle", cost: 25, category:"beverages"}
]


//load tables and menu
function loadTables(){
    for(var table of Tables){
        var div=document.createElement("div");
        var h3=document.createElement("h3");
        var cost=document.createElement("p");

        div.className="table box";
        div.setAttribute("id", table.id);
        h3.textContent=table.name;
        h3.className="table-name";

        cost.className="table-p";
        cost.style.display="inline";
        cost.textContent="Rs. "+table.TotalBill+" No. of items: "+table.numOfItems;

        div.appendChild(h3);
        div.appendChild(cost);
        div.addEventListener("drop",onDrop);
        div.addEventListener("dragover",dragOver);
        div.addEventListener("click", Button);

        document.getElementById('allTables').appendChild(div);
    }
}

loadTables();

function loadMenu(){
    for(var item of MenuList){
        var div=document.createElement("div");
        div.className="item box";

        var h3=document.createElement("h3");
        h3.innerHTML=item.item_name;
        div.id=item.id;

        var h4=document.createElement("h4");
        h4.innerHTML="Category:"+item.category;

        var cost=document.createElement("p");
        cost.innerHTML="Rs."+item.cost;

        div.appendChild(h3);
        div.appendChild(h4);
        div.appendChild(cost);

        document.getElementById('totalMenu').appendChild(div);
        div.setAttribute("draggable","true");
        div.addEventListener("dragstart",dragstart);
    }
}

loadMenu();

//search
function tableSearch(){
    var i;
    var input=document.getElementById("searchTable");
    var filter=input.value.toUpperCase();
    var myTable=document.getElementById("allTables");
    var table=myTable.getElementsByClassName("table");

    for(i=0;i<table.length;i++){
        var h3=table[i].getElementsByTagName('h3')[0];
        if(h3){
            if(h3.innerHTML.toUpperCase().indexOf(filter) > -1){
                table[i].style.display="";
            } else{
                table[i].style.display="none";
            }
        }
    }
}

function searchItems(){
    var i;
    var input=document.getElementById("searchMenu");
    var filter=input.value.toUpperCase();
    var myMenu=document.getElementById("totalMenu");
    var menu=myMenu.getElementsByClassName("item");

    for(i=0;i<menu.length;i++){
        var h3=menu[i].getElementsByTagName("h3")[0];
        var tag=menu[i].getElementsByTagName("h4")[0];
        if(h3.innerHTML.toUpperCase().indexOf(filter) > -1 || tag.innerHTML.toUpperCase().indexOf(filter) > -1){
            menu[i].style.display="";
        } else{
            menu[i].style.display="none";
        }
    }
}

//drag and drop
var price;
var itemName;

function dragstart(){
    for(var item of MenuList){
        if(item.id==this.id){
            price=item.cost;
            itemName=item.item_name;
            break;
        }
    }
}

function onDrop(){
    this.style.backgroundColor="orange";
    for(var table of Tables){
        if(table.id==this.id){
            table.numOfItems++;
            table.TotalBill+=price;
            table.items.push(itemName);

            var obj=JSON.parse(localStorage.getItem(table.name));

            for(var j=0;j<obj.length;j++){
                if(obj[j].item==itemName){
                    obj[j].quantity++;
                }
            }
            localStorage.setItem(table.name,JSON.stringify(obj));
            update();
            break;
        }
    }
}

function dragOver(e){
    e.preventDefault();
}

function update(){
    var tablePrice=document.getElementsByClassName("table-p");
    for(var i=0;i<tablePrice.length;i++){
        tablePrice[i].textContent="Rs. "+Tables[i].TotalBill+" No. of items: "+Tables[i].numOfItems;
    }
}



