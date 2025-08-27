export default defineEventHandler(async (event) => {
    let response;
    try {
        response = await $fetch.raw('http://localhost:80/api/contact/titles', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error)
    }
    return response?._data
})