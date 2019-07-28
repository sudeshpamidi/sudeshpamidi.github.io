//Discription : This containes functions of martgage calculator
//Author: Sudesh Pamidi

"use strict"

window.onload = function() {

    // get the control references
    const principalamt = document.getElementById("principal");
    const interestrate = document.getElementById("interestrate");
    const loanlength = document.getElementById("loanlength");
    const calculate = document.getElementById("calculate");
    const results = document.getElementById("results");
    const reset = document.getElementById("reset");

    //Calculate button event
    calculate.onclick = function() {

        let amount = Number(principalamt.value);
        let term = Number(loanlength.value);
        let apr = interestrate.value / 100;

        if (isNaN(amount) || isNaN(term) || isNaN(apr)) {

            results.style.display = "block";
            results.innerHTML = "<p class='error'>One or more input fields are not number(s).</p>";
            return;
        }

        let presendvalue = calculatepayment(amount, term, apr);

        //Display the results
        results.style.display = "block";
        results.innerHTML = "<strong>Present value:</strong> $" + presendvalue.toFixed(2);
    }

    //Principal Amount keyup event 
    principalamt.onkeyup = clearresults;

    //interest rate keyup event
    interestrate.onkeyup = clearresults;

    //number of years  keyup event
    loanlength.onkeyup = clearresults;

    //reset button 
    reset.onclick = clearresults;


    //Clear the results
    function clearresults() {
        document.getElementById("results").style.display = "none";
        results.innerHTML = "";
    };
}

//Calculate the present value
function calculatepayment(payout, term, apr) {

    var factor = (apr == 0 ? term : (1 - Math.pow(1 + apr, -term)) / apr);
    var presendvalue = payout * factor;

    return presendvalue;
};