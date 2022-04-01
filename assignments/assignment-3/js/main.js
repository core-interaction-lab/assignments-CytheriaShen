const fetchdessert = async () => {
    const response = await fetch('https://api.airtable.com/v0/appxfJxfQb92yyKkg/movies?maxRecords=100&view=Grid%20view&api_key=keykxG25CNr82Rf9Y').then(data => data.json());

    console.log(response);

    const dessertContainer = document.getElementById('dessert-container');

    response.records.forEach(dessert => {
        console.log(dessert.fields);
        const nameEl = document.createElement('heading');
        const specialityEl = document.createElement('div');
        const locationEl = document.createElement('div');
        const styleEl = document.createElement('div');
        const costEl = document.createElement('div');

        specialityEl.innerHTML = dessert.fields.speciality;
        locationEl.innerHTML = dessert.fields.location;
        styleEl.innerHTML = dessert.fields.style;

       

       
        costEl.innerHTML = dessert.fields.release_date;

        nameEl.append(specialityEl, locationEl, styleEl, costEl);

        dessertContainer.appendChild(nameEl);
    });

};

fetchdessert(); 