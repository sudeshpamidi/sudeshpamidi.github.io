/** Dicription: This script contains supporting functions for mountains.html page 
//  Adding table content with data in JSON object. 
// Author : Sudesh Pamidi
*/
"use strict"
$(document).ready(function() {

    const mountainDropdown = document.getElementById("mountain");
    const tMountain = document.getElementById("tableMountain");

    document.getElementById("today").innerHTML = new Date().toDateString() + " | 79° F";

    /***** Begining of getJSON******/
    $.getJSON("./data/mountains.json", function(data) {
        let mountains = data.mountains

        fillDropDown(mountainDropdown, mountains);

        //wiring the event 
        mountainDropdown.onchange = refreshData;

        //Show default data for first element in dropdown
        let items = getMountainInfo(mountainDropdown.value);
        displayData(tMountain, items);

        /**
         * This is to fill the dropDown with the data in array of elements.
         * @param {*} dropdown  -- dropdown name 
         * @param {*} obj       -- javascript object
         */
        function fillDropDown(dropdown, obj) {
            //adding the option dynamically
            let nextPos = dropdown.options.length;
            obj.forEach(function(e) {
                dropdown.options[nextPos] = new Option(e["name"], e["name"]);
                nextPos++;
            });
        }

        /** filter the array for given mountain name 
         * @param mountainName(text)  Mountain Name
         * returns the mountain object
         */
        function getMountainInfo(mountainName) {
            let mountain = mountains.filter(o => o.name == mountainName);
            return mountain;
        };

        /**
         * to refresh the data in the table 
         */
        function refreshData() {
            tMountain.innerHTML = "";
            items = getMountainInfo(mountainDropdown.value);
            displayData(tMountain, items);
        }

    });
    /***** End of getJSON******/

    /** to add the rows and columms of tbody with data
     * @param tbody table body element
     * @param data  array of elements
     */
    function displayData(table, data) {
        let i = 0;
        //Loop through each lable in mountainLabels(objects.js).
        mountainLabels.forEach(function(k) {
            //Object.keys(data[0]).forEach(function(k, i) {
            let label, text;
            label = k + ": ";
            switch (k) {
                case "Name":
                    text = data[0].name;
                    break;
                case "Elevation":
                    text = data[0].elevation;
                    break;
                case "Effort":
                    text = data[0].effort;
                    break;
                case "Image":
                    text = "<img src= 'images/" + data[0].img + "' >"
                    break;
                case "Coordinates":
                    text = "Lattitude : " + data[0].coords.lat + ", Longitude: " + data[0].coords.lng;
                    break;
                case "Description":
                    text = data[0].desc;
                    break;
            };
            addRow(table, i, label, text)
            i++;
        });

        //add row to table with sunrise/sunset information
        getSunriseSunset(data[0].coords.lat, data[0].coords.lng, table, i);
    };

    /**To addi a row to table with col values
     * @param {*} table -- table name
     * @param {*} i     -- row num
     * @param {*} lable -- lable text in first column
     * @param {*} text  -- text value in second column
     */
    function addRow(table, i, lable, text) {
        let tr = table.insertRow(i)
        let cell = tr.insertCell(0);

        cell.innerHTML = lable;
        tr.appendChild(cell);
        cell = tr.insertCell(1);
        cell.innerHTML = text;
        tr.appendChild(cell);
    };

    /** To fetch the sunrise and sunset information 
     * based on given lattitude and longitude write to a row in table
     * @param {*} lat          lattitide
     * @param {*} lng          longitude
     * @param {*} table        tablename
     * @param {*} childrow     row num
     */
    function getSunriseSunset(lat, lng, table, childrow) {
        let url = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng + "&date=today";
        $.getJSON(url, function(data) {
            let sunRiseSet = data.results;
            console.log(sunRiseSet.sunrise);
            addRow(table, childrow, "Sunrise/Sunset:", "Rise: " + sunRiseSet.sunrise + ",  Set: " + sunRiseSet.sunset);
        });
    };
});