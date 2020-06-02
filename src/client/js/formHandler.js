function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    const validUrl = Client.checkForName(formText)

    console.log("::: Form has been Submitted :::")
    if(!validUrl){
        alert("url invalid");
        return
    }
//     fetch('http://localhost:8081/test')
//     .then(res => res.json())
//     .then(function(res) {
//         document.getElementById('results').innerHTML = res.message
//     })
    let reqBody = {
        theText: formText
    };

    fetch('http://localhost:8081/testing', {
            method: 'POST',
            mode: 'cors',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text: reqBody})
        })
        .then(res => res.json())
        .then(function(res) {
            document.getElementById('polarity').innerHTML = res.polarity
            document.getElementById('subjectivity').innerHTML = res.subjectivity
            document.getElementById('polarity_confidence').innerHTML = res.polarity_confidence
            document.getElementById('subjectivity_confidence').innerHTML = res.subjectivity_confidence
            document.getElementById('entered_text').innerHTML = res.text
            console.log(res);
            alert(formText);
        })
}

export { handleSubmit }