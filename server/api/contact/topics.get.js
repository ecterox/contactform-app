export default defineEventHandler(async (event) => {
    let response;
    try {
        response = await $fetch.raw('http://symfony:80/api/contact/topics', {
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