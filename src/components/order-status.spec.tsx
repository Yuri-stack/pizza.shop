import { render } from '@testing-library/react'
import { OrderStatus } from './order-status'

describe('Order Status', () => {
    it('should display the right text when order status is pending', () => {
        // render é uma função que gera o código TSX/HTML sem abrir o navegador
        const wrapper = render(<OrderStatus status='pending' />)

        // debug() permite vermos o código TSX/HTML gerado pelo render()
        // wrapper.debug()

        const statusText = wrapper.getByText('Pendente')
        const badgeElement = wrapper.getByTestId('badge')

        // outerHtml permite ver no console o que o getBy encontrou
        // console.log(badgeElement.outerHTML)

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-slate-400')

    })

    it('should display the right text when order status is canceled', () => {
        const wrapper = render(<OrderStatus status='canceled' />)

        const statusText = wrapper.getByText('Cancelado')
        const badgeElement = wrapper.getByTestId('badge')

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-rose-400')

    })

    it('should display the right text when order status is delivering', () => {
        const wrapper = render(<OrderStatus status="delivering" />)

        const statusText = wrapper.getByText('Saiu para a entrega')
        const badgeElement = wrapper.getByTestId('badge')
        console.log(badgeElement.outerHTML)

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-amber-400')
    })

    it('should display the right text when order status is processing', () => {
        const wrapper = render(<OrderStatus status="processing" />)

        const statusText = wrapper.getByText('Em preparo')
        const badgeElement = wrapper.getByTestId('badge')

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-amber-400')
    })

    it('should display the right text when order status is delivered', () => {
        const wrapper = render(<OrderStatus status="delivered" />)

        const statusText = wrapper.getByText('Entregue')
        const badgeElement = wrapper.getByTestId('badge')

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-emerald-400')
    })
})