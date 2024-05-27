window.addEventListener("load",function() {


    let iduriProduse=localStorage.getItem("cos_virtual");
    iduriProduse=iduriProduse?iduriProduse.split(","):[];      //["3","1","10","4","2"]
    document.getElementById("datalist-memorie-choice").value="toate";

    for(let idp of iduriProduse){
        let ch = document.querySelector(`[value='${idp}'].select-cos`);
        if(ch){
            ch.checked=true;
        }
        else{
            console.log("id cos virtual inexistent:", idp);
        }
    }

    //----------- adaugare date in cosul virtual (din localStorage)
    let checkboxuri= document.getElementsByClassName("select-cos");
    for(let ch of checkboxuri){
        ch.onchange=function(){
            let iduriProduse=localStorage.getItem("cos_virtual");
            iduriProduse=iduriProduse?iduriProduse.split(","):[];

            if( this.checked){
                iduriProduse.push(this.value)
            }
            else{
                let poz= iduriProduse.indexOf(this.value);
                if(poz != -1){
                    iduriProduse.splice(poz,1);
                }
            }

            localStorage.setItem("cos_virtual", iduriProduse.join(","))
        }
        
    }


    document.getElementById("inp-pret").onchange=function(){
        document.getElementById("infoRange").innerHTML=`(${this.value})`
    }


    document.getElementById("filtrare").onclick= function(){
        let val_nume=document.getElementById("inp-nume").value.toLowerCase();

        let radiobuttons=document.getElementsByName("gr_rad");
        let val_frecventa;
        for(let r of radiobuttons){
            if(r.checked){
                val_frecventa=r.value;
                break;
            }
        }

        let bool_radiobuttons=document.getElementsByName("bool_rad");
        let val_promotie;
        for(let r of bool_radiobuttons){
            if(r.checked){
                val_promotie=r.value;
                break;
            }
        }

        var frecv_min, frecv_max;
        if(val_frecventa!="toate")
        {
            vfrecv=val_frecventa.split(":");
            frecv_min=parseInt(vfrecv[0]);
            frecv_max=parseInt(vfrecv[1]);
        }

        let val_pret=document.getElementById("inp-pret").value;

        let val_categ=document.getElementById("inp-categorie").value;
        console.log(val_categ)

        var produse=document.getElementsByClassName("produs");
        var inpDescriere = document.getElementById("inp-descriere").value.trim();

        var inpMemorie = document.getElementById("datalist-memorie-choice").value.toLowerCase().trim();
        console.log(inpMemorie);

        //var selectData = document.getElementById("inp-data"); /select multiplu 7a/
        //var selectedMonths = Array.from(selectData.selectedOptions).map(option => parseInt(option.value));




        var gasit = false;
        for (let produs of produse) {
            let valDescriere = produs.getElementsByClassName("val-descriere")[0].textContent.toLowerCase().trim();
            console.log(valDescriere);
            if (valDescriere.includes(inpDescriere)) {
                gasit = true;
                break;
            }
        }
        if (!gasit) {
            // Dacă textul căutat nu este găsit în niciun produs, adaugă clasa 'is-invalid' și afișează un mesaj de eroare
            document.getElementById("inp-descriere").classList.add("is-invalid");
            return; // Oprește executarea funcției dacă inputul nu este valid
        } else {
            // Dacă textul este găsit în cel puțin un produs, elimină clasa 'is-invalid'
            document.getElementById("inp-descriere").classList.remove("is-invalid");
        }



        for (let prod of produse){
            
            prod.style.display="none";
            let nume=prod.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase();

            let cond1= (nume.startsWith(val_nume));

            let frecventa=parseInt(prod.getElementsByClassName("val-frecventa")[0].innerHTML);

            let cond2= (val_frecventa=="toate" || frecv_min<=frecventa && frecventa <frecv_max);

            let pret=parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML);

            let cond3= (pret>=val_pret);

            let categorie=prod.getElementsByClassName("val-categorie")[0].innerHTML;
            let cond4= ( val_categ=="toate" ||  val_categ==categorie)
            console.log(categorie)
            let promotie = prod.getElementsByClassName("val-promotie")[0].innerHTML.toLowerCase().trim();
            let cond5 = (val_promotie == "toate" || promotie.toString() === val_promotie);

            let valDescriere = prod.getElementsByClassName("descriere")[0].textContent.toLowerCase().trim();
            let cond6 = valDescriere.includes(inpDescriere);

            let valMemorie = prod.getElementsByClassName("tipuri_memorie")[0].innerHTML.toLowerCase().trim();
            let cond7 = (inpMemorie == valMemorie || inpMemorie == "toate")

            //let valDataAdaugare = new Date(produs.getElementsByClassName("data_adaugare")[0].textContent);
            //let cond8 = selectedMonths.includes(valDataAdaugare.getMonth() + 1);


            if(cond1 && cond2 && cond3 && cond4 && cond5 && cond6 &&cond7){
                prod.style.display="grid";
            }
        }
    }

    document.getElementById("resetare").onclick= function(){
                
        document.getElementById("inp-nume").value="";
        
        document.getElementById("inp-pret").value=document.getElementById("inp-pret").min;
        document.getElementById("inp-categorie").value="toate";
        document.getElementById("datalist-memorie-choice").value="toate";
        document.getElementById("i_rad4").checked=true;
        document.getElementById("b_rad3").checked=true;
        document.getElementById("inp-descriere").value = "";
        var produse=document.getElementsByClassName("produs");
        document.getElementById("infoRange").innerHTML="(0)";
        for (let prod of produse){
            prod.style.display="grid";
        }
    }
    function sortare (semn){
        var produse=document.getElementsByClassName("produs");
        var v_produse= Array.from(produse);
        v_produse.sort(function (a,b){
            let pret_a=parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML);
            let pret_b=parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML);
            if(pret_a==pret_b){
                let nume_a=a.getElementsByClassName("val-nume")[0].innerHTML;
                let nume_b=b.getElementsByClassName("val-nume")[0].innerHTML;
                return semn*nume_a.localeCompare(nume_b);
            }
            return semn*(pret_a-pret_b);
        });
        for(let prod of v_produse){
            prod.parentElement.appendChild(prod);
        }
    }
    document.getElementById("sortCrescNume").onclick=function(){
        sortare(1);
    }
    document.getElementById("sortDescrescNume").onclick=function(){
        sortare(-1);
    }

    const gridItems = document.querySelectorAll('.grid-produse .card');
    gridItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 300); // Adjust the delay as needed
    });
    


    window.onkeydown= function(e){
        if (e.key=="c" && e.altKey){
            if(document.getElementById("info-suma"))
                return;
            var produse=document.getElementsByClassName("produs");
            let suma=0;
            for (let prod of produse){
                if(prod.style.display!="none")
                {
                    let pret=parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML);
                    suma+=pret;
                }
            }
            
            let p=document.createElement("p");
            p.innerHTML=suma;
            p.id="info-suma";
            ps=document.getElementById("p-suma");
            container = ps.parentNode;
            frate=ps.nextElementSibling
            container.insertBefore(p, frate);
            setTimeout(function(){
                let info=document.getElementById("info-suma");
                if(info)
                    info.remove();
            }, 1000)
        }
    }



});