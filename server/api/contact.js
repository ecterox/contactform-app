export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Hier könntest du deine externe API aufrufen
    // oder die Daten direkt verarbeiten

        await $fetch( 'http://localhost:80/api/contact', {
            method: 'POST',
            body: body
        } );

    return { success: true, data: body }
})