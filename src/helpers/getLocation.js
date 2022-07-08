function getLocation(setLocation, setError, toggleLoading) {
    toggleLoading(true);
    setError({error: false, message: ""})

    navigator.geolocation.requestAuthorization();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
        setError({error: true, message: "Locatiebepaling wordt niet ondersteund"})
        toggleLoading(false);
    }

    function showPosition(position) {
        setLocation({
            latitude: position.coords.latitude,
            longtitude: position.coords.longitude,
        })
        toggleLoading(false);
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.");
                setError({error: true, message: "De gebruiker heeft de locatiebepaling geweigerd"})
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