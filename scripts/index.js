/** Dicription: This script contains to populate today field
// Author : Sudesh Pamidi
*/
window.onload = function() {
    document.getElementById("today").innerHTML = new Date().toDateString() + " | 79° F";
};