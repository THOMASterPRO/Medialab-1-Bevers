function testCode() {
    // let input = document.getElementById('input').value;
    let input = "";
    // input = "Een idee voor een nieuw televisieprogramma voor de NPO zou kunnen zijn om een competitieprogramma te maken waarin jonge start-ups uit verschillende delen van Nederland strijden om de beste innovatieve oplossing voor een maatschappelijk probleem. Het programma zou zich kunnen richten op verschillende thema's, zoals duurzaamheid, gezondheid en sociale inclusie. Gedurende het programma worden de teams begeleid door mentoren en experts en krijgen ze de kans om hun ideeën te pitchen aan een panel van investeerders en potentiële klanten. Het programma biedt niet alleen een platform voor jonge ondernemers om hun ideeën te presenteren, maar het laat ook zien hoe innovatie kan bijdragen aan het oplossen van maatschappelijke uitdagingen."

    runAI(input)
}

function runAI(input) {
    let output = []; 

    fetch('http://localhost:3000', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            input: input,
        })
    })
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.output.length; i++) {
            const dataObject = data.output[i];

            if (dataObject.text_generated_by_step_name == "summarize" || dataObject.text_generated_by_step_name == "enhance") {
                output.push({
                    label: dataObject.text_generated_by_step_name,
                    content: dataObject.contents[0]
                })
            }
            if (dataObject.text_generated_by_step_name == "input") {
                let topics = [];

                for (let j = 0; j < dataObject.labels.length; j++) {
                    let label = dataObject.labels[j];

                    if (label.type == "sentiment") {
                        output.push({
                            label: label.type,
                            content: label.span_text
                        })
                    } 
                    else {
                        topics.push(label.value);
                    }
                }

                output.push({
                    label: "topics",
                    content: topics
                })
            }
        }
    }).then(() => {
        showOutput(output)
    });
}

function showOutput(output) {
    console.log(output);
}