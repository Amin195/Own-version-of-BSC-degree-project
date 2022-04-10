const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
    .then(FingerprintJS => FingerprintJS.load())

// Get the visitor identifier when you need it.
fpPromise
    .then(fp => fp.get())
    .then(result => {
        // This is the visitor identifier:
        const visitorId = result.visitorId
        document.querySelector('form').addEventListener('submit', async () => {
            console.log('Visitor ID when submitting: ', visitorId)
            await postFP('http://localhost:3000/fp', { fingerprintJS: visitorId })
        });
        console.log(visitorId)
    })
async function postFP(url, body) {
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    console.log('the data being posted to, ', url, 'is the following: ', data)
    const response = await fetch(url, data)

    if (!response.ok) {
        const data = await response.json()

        console.log(response)
        console.log(JSON.stringify(data, null, 4))

        throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response
}

//TODO use information from here to understand how to get CANVAS only!