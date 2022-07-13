function getLocation(setError, toggleLoading, session, toggleWorkaround, registrationFunction, toggleWrongLocationCard) {
    const sessionInformation = session;
    toggleLoading(true);
    toggleWrongLocationCard(false);
    setError({error: false, message: ""})
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        setError({error: true, message: "Locatiebepaling wordt niet ondersteund"})
        toggleLoading(false);
    }

    function showPosition(position) {
        if (position.coords.latitude > 52.518649 && position.coords.latitude < 52.519175 && position.coords.longitude > 6.267233 && position.coords.longitude < 6.268110) {
            registrationFunction(false);

        } else {
            if(sessionInformation.session.active) {
                toggleWrongLocationCard(true);
                toggleWorkaround(true);
            } else {
                setError({error: true, message: "Je locatie is niet juist, registratie kan niet gestart worden"});
                toggleWorkaround(true);
                // toggleLoading(false);
            }

        }
        // toggleLoading(false);
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setError({error: true, message: "Locatiebepaling is geweigerd. Wijzig uw locatierechten"})
                toggleLoading(false);
                break;
            case error.POSITION_UNAVAILABLE:
                setError({error: true, message: "Locatiebepaling is niet beschikbaar"})
                toggleLoading(false);
                break;
            case error.TIMEOUT:
                setError({error: true, message: "Request time out"})
                toggleLoading(false);
                break;
            case error.UNKNOWN_ERROR:
                toggleLoading(false);
                break;
        }
    }
}

export default getLocation;