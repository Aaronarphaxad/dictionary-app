function constructAPIEndpoint(word, language, version = 'v2') {
    return `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;
}

const form = document.querySelector('#search-form');

// Event listener for when user submits search for word
form.addEventListener("submit", function(e) {
    e.preventDefault();

    let word = document.querySelector('#input1').value,
        language = document.querySelector('[name="lang"]').value;
    let resultPage = document.getElementById('results');

    // determine language of the searched word
    let languageToSend;
    if (language == 'en_US') {
        languageToSend = "englishUS";
    } else if (language == 'hi') {
        languageToSend = "hindi";
    } else if (language == 'es') {
        languageToSend = "spanish";
    } else if (language == 'fr') {
        languageToSend = "french";
    } else if (language == 'ja') {
        languageToSend = "japanese";
    } else if (language == 'ru') {
        languageToSend = "russian";
    } else if (language == 'en_GB') {
        languageToSend = "englishGB";
    } else if (language == 'de') {
        languageToSend = "german";
    } else if (language == 'it') {
        languageToSend = "italian";
    } else if (language == 'ko') {
        languageToSend = "korean";
    } else if (language == 'pt-BR') {
        languageToSend = "brazilian";
    } else if (language == 'ar') {
        languageToSend = "arabic";
    } else {
        languageToSend = "turkish";
    }


    // send fetch request to the API
    fetch(constructAPIEndpoint(word, language))
        .then(response => {
            // Handle error if word is not found
            if (response.status == 404) {
                resultPage.innerHTML = `<div class="card p-3 error-message">
                <h4>No definitions found. </h4>
                <p>Sorry pal, we couldn't find definitions for the word you were looking for :( </p>
                    <p>Resolution: You can try the search again at later time or head to the web instead. </p>
                    </div>
                    `
                document.getElementById('definitions1').style.display = 'none';
                document.getElementById('definitions2').style.display = 'none';
            } else {

                return response.json()
            }

        })
        .then(data => {

            document.getElementById('input1').addEventListener('click', () => {
                    location.reload();
                    document.getElementById('definitions1').style.display = 'block';
                    document.getElementById('definitions2').style.display = 'block';

                })
                // get all the data needed from the json response
            let object = data[0]
            let word = object['word']
            let sound = object['phonetics'][0]['audio']
            let meanings1 = object['meanings'][0]
            let partOfSpeech = object['meanings'][0]['partOfSpeech']
            let meanings2 = object['meanings'][1]

            // store phonetics dynamically
            let phonetics;
            if (object['phonetics'][0]['text'] == undefined) {
                phonetics = 'Not available';
            } else {
                phonetics = object['phonetics'][0]['text'].toString();
            }

            // 
            resultPage.innerHTML = `
                <div><h3>${word}</h3> </div>
                <div>${phonetics} </div>
                <div class="mt-2"><audio controls>
                <source src='${sound}' type="audio/mpeg">
                Your browser does not support the audio element.
                </audio></div>
                
                `;




            let defView;
            let defs;
            let defss;
            let mean;

            meanings1['definitions'].forEach(meaning => {
                for (let m in meaning) {

                    mean = meaning

                    defViews = document.getElementById('definitions1');
                    defs = createElement('div', { 'class': 'm-3 p-2' });
                    defs.innerHTML = `<div class=''><strong>${m}:</strong> <span>${meaning[m]}</span></div> `
                        // console.log(`${m}: ${meaning[m]}`)
                    defViews.classList.add('card');
                    defViews.append(defs)
                }
            });
            let definition = mean['definition']
            let synonyms;
            if (mean['synonyms'] == undefined) {
                synonyms = 'Not available';
            } else {
                synonyms = mean['synonyms'].toString();
            }
            // let synonyms = mean['synonyms'].toString();
            let example = mean['example']

            // Add event listener to save button
            let saveButton = document.getElementById('save-btn');
            saveButton.addEventListener('click', () => {
                fetch("/profile", {
                        method: "POST",
                        body: JSON.stringify({
                            word,
                            sound,
                            partOfSpeech,
                            phonetics,
                            definition,
                            example,
                            synonyms,
                            languageToSend
                        }),
                    }).then(response => response.json())
                    .then(result => {
                        if (result.error) {
                            console.log(`error sending post ${result.error}`)
                        } else {
                            alert("Word saved successfully")
                        }
                    });
                // end of POST request
            });
            // end of send button event listener


            meanings2['definitions'].forEach(meaning => {
                for (let m in meaning) {

                    defView = document.getElementById('definitions2');
                    defss = createElement('div', { 'class': 'm-3 p-2' });
                    defss.innerHTML = `<div class=''><strong>${m}: </strong> <span>${meaning[m]}</span> </div> `
                        // console.log(`${m}: ${meaning[m]}`)
                    defView.classList.add('card');
                    defView.append(defss)
                }
            })


            // EVent listener to refresh page on click
            document.getElementById('input1').addEventListener('click', () => {
                location.reload();
                document.getElementById('definitions1').style.display = 'block';
                document.getElementById('definitions2').style.display = 'block';

            });
        });
    // end of fetch request


});
// end of submit event listener

// Tool tip jQuery
$('[data-toggle="tooltip"]').tooltip();



// Function to create element
function createElement(element, attribute, inner) {
    if (typeof(element) === "undefined") {
        return false;
    }
    if (typeof(inner) === "undefined") {
        inner = "";
    }
    var el = document.createElement(element);
    if (typeof(attribute) === 'object') {
        for (var key in attribute) {
            el.setAttribute(key, attribute[key]);
        }
    }
    if (!Array.isArray(inner)) {
        inner = [inner];
    }
    for (var k = 0; k < inner.length; k++) {
        if (inner[k].tagName) {
            el.appendChild(inner[k]);
        } else {
            el.appendChild(document.createTextNode(inner[k]));
        }
    }
    return el;
}