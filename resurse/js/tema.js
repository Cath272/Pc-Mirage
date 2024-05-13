let tema=localStorage.getItem("schimba_tema");

if(tema)
    document.body.classList.add("dark");
    
window.addEventListener("DOMContentLoaded", function(){
document.getElementById("schimba_tema").onclick= function(){
    if(document.body.classList.contains("dark")){
        document.body.classList.remove("dark")
        localStorage.removeItem("schimba_tema");
    }
    else{
        document.body.classList.add("dark")
        localStorage.setItem("schimba_tema","dark");
    }
}
});