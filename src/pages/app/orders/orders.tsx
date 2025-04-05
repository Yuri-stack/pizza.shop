import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { OrderTableRow } from "./order-table-row";
import { OrderTableFilters } from "./order-table-filters";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/get-orders";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { OrderTableSkeleton } from "./order-table-skeleton";

export function Orders() {
    const [searchParams, setSearchParams] = useSearchParams()

    const orderId = searchParams.get("orderId")
    const customerName = searchParams.get("customerName")
    const status = searchParams.get("status")

    const pageIndex = z.coerce  // coerce tenta converter x em y, texto em número
        .number()
        .transform((page) => page - 1)
        .parse(searchParams.get('page') ?? '1')

    let isLoadingOrdersPlaceholder = true;

    const { data: result, isLoading: isLoadingOrders } = useQuery({
        queryKey: ['orders', pageIndex, orderId, customerName, status],    // toda informação que vai alterar o valor precisa estar na queryKey | Sempre que o user trocar a página a gente pedir para o R.Query procurar os dados
        queryFn: () => getOrders({
            pageIndex,
            customerName,
            orderId,
            status: status === 'all' ? null : status
        })
    })

    function handlePaginated(pageIndex: number) {
        setSearchParams(prev => {   // prev é a página que já está na url
            prev.set('page', (pageIndex + 1).toString())
            return prev
        })
    }

    return (
        <>
            <Helmet title="Pedidos" />
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">
                    Pedidos
                </h1>

                <div className="space-y-2.5">
                    <OrderTableFilters />

                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[64px]"></TableHead>
                                    <TableHead className="w-[140px]">Identificador</TableHead>
                                    <TableHead className="w-[180px]">Realizado há</TableHead>
                                    <TableHead className="w-[140px]">Status</TableHead>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead className="w-[140px]">Total do Pedido</TableHead>
                                    <TableHead className="w-[164px]"></TableHead>
                                    <TableHead className="w-[132px]"></TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {result &&
                                    result.orders?.map((order) => {
                                        return <OrderTableRow key={order.orderId} order={order} />
                                    })}
                            </TableBody>
                        </Table>
                    </div>

                    {isLoadingOrdersPlaceholder && <OrderTableSkeleton />}

                    {
                        result && (
                            <Pagination
                                onPageChange={handlePaginated}
                                pageIndex={result.meta?.pageIndex}
                                totalCount={result.meta?.totalCount}
                                perPage={result.meta?.perPage} />
                        )
                    }
                </div>
            </div>
        </>
    )
}
