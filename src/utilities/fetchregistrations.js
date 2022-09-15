const FetchRegistrations = async (setData) => {
    try {
        const response = await fetch(process.env.REACT_APP_HOST+"/api/registration");
        const jsonData = await response.json();

        setData(jsonData);
    } catch (err) {
        console.error(err.message);

    }
}

export default FetchRegistrations;