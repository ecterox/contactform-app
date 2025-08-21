export default defineEventHandler(async (event) => {
    const body = await readBody(event) // POST Data
    const res = await $fetch( 'http://localhost:80/api/contact', {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return { error: false, data: res }
})