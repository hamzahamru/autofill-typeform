// auto https://www.architect.xyz/

const fetch = require('node-fetch');
const fs = require('fs');
const postData = (signature, landed, name,  email) => new Promise((resolve, reject) => {
    fetch('https://form.typeform.com/forms/kI6Wpt7v/complete-submission', {
    method: 'POST',
    headers: {
        'authority': 'form.typeform.com',
        'accept': 'application/json',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json; charset=UTF-8',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    },
    body: JSON.stringify({
        'signature': signature,
        'form_id': 'kI6Wpt7v',
        'landed_at': landed,
        'answers': [
            {
                'field': {
                    'id': 'Mc5FmNKczKq6',
                    'type': 'short_text'
                },
                'type': 'text',
                'text': name
            },
            {
                'field': {
                    'id': 's5UzXfct5CQm',
                    'type': 'email'
                },
                'type': 'email',
                'email': email
            },
            {
                'field': {
                    'id': 'qmzaD93sqOsr',
                    'type': 'multiple_choice'
                },
                'type': 'choices',
                'choices': [
                    {
                        'id': 'K9kuTvYLtCve',
                        'label': 'Binance'
                    }
                ]
            },
            {
                'field': {
                    'id': 'BNP8GAulOURr',
                    'type': 'multiple_choice'
                },
                'type': 'choices',
                'choices': [
                    {
                        'id': 'fW2dUC3AoWmz',
                        'label': '$0 to $1,000,000'
                    }
                ]
            }
        ]
    })
})
.then(res => res.text())
.then(res => {
    resolve(res)
})
.catch(err => {
    reject(err)
})
});

const getSignature = (response_id) => new Promise ((resolve, reject) => {
    fetch(`https://form.typeform.com/forms/kI6Wpt7v/start-submission`, {
        method: 'POST',
        headers: {
            'authority': 'form.typeform.com',
            'accept': 'application/json',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json; charset=UTF-8',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
        },
    })
    .then(res => res.json())
    .then(res => {
        resolve(res)
    })
      .catch(err => {
        reject(err)
      })
    });

    (async () => {
    do {
        i= 0
        var stop = false;
        i = i + 1;
        let wallet = fs.readFileSync('email.txt', 'utf8').split('\n');
        let exe = wallet.splice(0, 1);
        let sisa = wallet;
        if (sisa.length <= 0) {
        stop = true;
        }
        const email = exe[0].trim();
        const name = email.split('@')[0]
        const result = await getSignature();
        const signature = result.signature.split(':')[0]
        const submit = result.submission
        const landed = submit.landed_at; 
        const postDataResult = await postData(signature, landed, name,  email);
        console.log(postDataResult)
        await fs.writeFileSync('email.txt', sisa.join('\n'));
        //console.log(`${signature}, ${landed}`)
    } while (stop === false);

    })();