telegramApi.setConfig({
    app: {
        id: 152136 , /* App ID */
        hash: 'a6acaa1437cb9d96015726ea9184575a', /* App hash */
        version: '0.0.0' /* App version */
    },
    server: {
        test: [
            {
                id: 2, /* DC ID */
                host: '149.154.167.40',
                port: 443
            }
        ],
        production: [
            {
                id: 2, /* DC ID */
                host: '149.154.167.50',
                port: 443
            }
        ]
    }
});


let phoneNumber = '+79522945763';
let password = 'AdorDorath_88';
telegramApi.getUserInfo().then(function(user) {
    if (user.id) {
        console.info('Logged in')
    } else {
        //telegramApi.sendCode(phoneNumber).then(sent_code => console.log(sent_code.phone_code_hash));
        telegramApi.signIn(phoneNumber, '65b37e7f5de0043ccb', '59506').then(function() {
            // Sign in complete
        }, function(err) {
            switch (err.type) {
                case 'PHONE_CODE_INVALID':
                    // alert "Phone code invalid"
                    break;
                case 'PHONE_NUMBER_UNOCCUPIED':
                    // User not registered, you should use signUp method
                    break;
                case 'SESSION_PASSWORD_NEEDED':
                    telegramApi.invokeApi('account.getPassword', {},{dcID: 2, createNetworker: true, noErrorBox: true}).then(({ current_salt }) =>  {
                            const passwordUTF8 = decodeURIComponent(encodeURIComponent(password));
                            let buffer = new ArrayBuffer(passwordUTF8.length);
                            const byteView = new Uint8Array(buffer);
                            const len = passwordUTF8.length;
                            for (let i = 0; i < len; i++) {
                                byteView[i] = passwordUTF8.charCodeAt(i);
                            }

                            buffer = bufferConcat(bufferConcat(current_salt, byteView), current_salt);

                            return bytesFromWords(crypto.subtle.digest(bytesToWords(buffer)));
                    }).then(function(passwordHash){
                        telegramApi.invokeApi('auth.checkPassword', {
                            password_hash: passwordHash
                        }, {dcID: 2, createNetworker: true, noErrorBox: true})
                    })
            }
        })
    }
});

