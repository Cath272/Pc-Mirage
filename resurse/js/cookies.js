function setCookie(nume, val, timpExpirare) {
    let d = new Date();
    d.setTime(d.getTime() + timpExpirare);
    document.cookie = `${nume}=${val}; expires=${d.toUTCString()}; path=/`;
}

function getCookie(nume) {
    let vectorParametri = document.cookie.split(";"); // ["a=10","b=ceva"]
    for (let param of vectorParametri) {
        if (param.trim().startsWith(nume + "="))
            return param.split("=")[1];
    }
    return null;
}

function deleteCookie(nume) {
    document.cookie = `${nume}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

window.addEventListener("load", function () {
    let banner = document.getElementById("banner");

    // Show the banner if the "acceptat_banner" cookie is not set
    if (!getCookie("acceptat_banner")) {
        banner.style.display = "block";
    }

    // Handle the click event on the "ok" button
    document.getElementById("ok_cookies").onclick = function () {
        setCookie("acceptat_banner", true,  30 * 1000); // Cookie expires after a week
        banner.style.display = "none";
    };
});
