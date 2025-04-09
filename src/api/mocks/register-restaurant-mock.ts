import { http, HttpResponse } from 'msw'
import { RegisterRestaurantBody } from '../register-restaurant'

export const registerRestaurantMock = http.post<never, RegisterRestaurantBody>('/restaurants', async ({ request }) => {
    const { restaurantname } = await request.json()

    if (restaurantname === 'Pizza Shop')
        return new HttpResponse(null, { status: 201 })

    return new HttpResponse(null, { status: 400 })
})

