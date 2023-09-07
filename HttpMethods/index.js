
    const form = document.getElementById("postForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 
        
        const title = document.getElementById("title").value;
        const body = document.getElementById("body").value;

        let options = {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 1,
            })
        }

        fetch('https://jsonplaceholder.typicode.com/posts', options)
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((error) => console.error("Error:", error));
    });

