export default defineEventHandler(async (event) => {
    let response;
    try {
        const body = await readBody(event) // POST Data

        response = await $fetch.raw('http://localhost:80/api/contact', {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error)
    }
    return response?._data
})