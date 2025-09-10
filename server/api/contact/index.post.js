export default defineEventHandler(async (event) => {
    let response;
    try {
        const body = await readBody(event) // POST Data
        response = await $fetch.raw('http://symfony:80/api/contact', {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response?._data)
    } catch (error) {
        console.log(error)
    }
    return response?._data
})