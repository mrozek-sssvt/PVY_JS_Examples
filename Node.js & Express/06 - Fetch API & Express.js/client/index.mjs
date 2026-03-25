// Chceme načíst data z API
async function getDataFromApi() {
   try {
       const response = await fetch("http://localhost:3000/users")

       if (response.ok) {
           return await response.json();
       }
   } catch (error) {
       console.error(error);
   }

    //request.then(res => res.json()).then((data) => console.log(data));
}

async function postData(data) {
    try {
        const response = await fetch(
            "http://localhost:3000/post",
            {
                method: "POST",
                body: JSON.stringify(data)
            }
        );

        if (response.ok) {
           return;
        }

        throw Error(response.statusMessage);
    } catch (error) {
        console.error(error);
    }

    //request.then(res => res.json()).then((data) => console.log(data));
}


const data = await getDataFromApi();
console.log(data);
await postData(data);
