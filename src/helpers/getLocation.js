function getLocation(setError, toggleLoading, session, toggleWorkaround, registrationFunction) {
    toggleLoading(true);
    setError({error: false, message: ""})

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
        setError({error: true, message: "Locatiebepaling wordt niet ondersteund"})
        toggleLoading(false);
    }

    function showPosition(position) {
        if (position.coords.latitude > 52.518649 || position.coords.latitude < 52.519175 || position.coords.longitude > 6.267233 || position.coords.longitude < 6.268110) {
            if(session.active) {
                console.log("stop");
                registrationFunction();
            }
            if(!session.active) {
                console.log("Start");
                registrationFunction();
            }
        } else {
            setError({error: true, message: "Je bent niet bij de kantine, registratie kan niet gestart worden"});
            toggleWorkaround(true);
        }

        toggleLoading(false);
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.");
                setError({error: true, message: "Locatiebepaling is geweigerd. Wijzig uw locatierechten"})
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.");
                setError({error: true, message: "Locatiebepaling is niet beschikbaar"})
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.");
                setError({error: true, message: "Request time out"})
                break;
            case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.");
                break;
        }
    }
}

export default getLocation;