import { api } from "@/lib/axios"

export interface RegisterRestaurantBody {
    restaurantname: string
    managerName: string
    email: string
    phone: string
}

export async function registerRestaurant({ email, managerName, phone, restaurantname }: RegisterRestaurantBody) {
    await api.post('/restaurants', { email, managerName, phone, restaurantname })
}