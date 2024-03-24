import React from 'react'

import { useSearchParams } from "react-router-dom";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { PlusSquare } from 'lucide-react';
import { MinusSquare } from 'lucide-react';

const modifiedColumns = ({ handleDelete, handleData, stockDataCol }) => {


    const columnKeys = [
        {
            accessorKey: "action",
            header: "",
            cell: ({ row }) => {
                const symbol = row.getValue("symbol");

                return (<AlertDialog className="bg-white-900" >
                    <AlertDialogTrigger asChild>
                        <Button className="capitalize flex flex row gap-2"> <MinusSquare className="text-red-500" /> </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-stone-900">Do you want to remove this stock from watchlist?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction className="text-stone-900 font-bold border-stone-900 font-semibold rounded-full gap-2 border-slate-900 hover:bg-slate-500 w-[150px]" onClick={handleDelete && handleDelete({ symbol })}>Yes</AlertDialogAction>
                            <AlertDialogCancel className="text-white  bg-slate-900 font-bold font-semibold rounded-full gap-2 hover:bg-slate-500 w-[150px]">Cancel</AlertDialogCancel>

                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>)
            },
        },
        {
            accessorKey: "symbol",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Symbol
                        <CaretSortIcon className="ml-2 h-7 w-7" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <Button className="capitalize font-extrabold" onClick={handleData && handleData({ symbol: row.getValue("symbol") })}> {row.getValue("symbol")}</Button>
            ),
        },
        {
            accessorKey: "series",
            header: "Series",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("series")}</div>
            ),
        },
        {
            accessorKey: "percentage_change",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        % Change
                        <CaretSortIcon className="ml-2 h-7 w-7" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("percentage_change")}</div>
            ),
        },
        {
            accessorKey: "openprice",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Open
                        <CaretSortIcon className="ml-2 h-7 w-7" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("openprice")}</div>
            ),
        },
        {
            accessorKey: "highprice",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        High
                        <CaretSortIcon className="ml-2 h-7 w-7" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("highprice")}</div>
            ),
        },
        {
            accessorKey: "lowprice",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Low
                        <CaretSortIcon className="ml-2 h-7 w-7" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("lowprice")}</div>
            ),
        },
        {
            accessorKey: "closeprice",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Close
                        <CaretSortIcon className="ml-2 h-7 w-7" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("closeprice")}</div>
            ),
        },
        {
            accessorKey: "prevclose",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Prev. Close
                        <CaretSortIcon className="ml-2 h-7 w-7" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("prevclose")}</div>
            ),
        },
        {
            accessorKey: "totaltradeqty",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        TTL QNTY
                        <CaretSortIcon className="ml-2 h-7 w-7" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("totaltradeqty")}</div>
            ),
        },
        {
            accessorKey: "deliveryqty",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        DLVRY QNTY
                        <CaretSortIcon className="ml-2 h-7 w-7" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("deliveryqty")}</div>
            ),
        },
        {
            accessorKey: "deliverypercent",
            header: "Delivery %",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("deliverypercent")}</div>
            ),
        },
        {
            accessorKey: "turnover",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Turnover (in lcs.)
                        <CaretSortIcon className="ml-2 h-7 w-7" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("turnover")}</div>
            ),
        },
        {
            accessorKey: "liveprice",
            header: () => <div className="text-right">Live Price</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("liveprice"))

                // Format the amount as a dollar amount

                return <div className="text-right font-medium">34646</div>
            },
        }
    ];
    if (stockDataCol) {

        return columnKeys.filter((value) => stockDataCol.includes(value['accessorKey']));
    }
    return columnKeys;
}


function DataTableDemo(props) {
    const { hideKeys, data = [], handleDelete, handleData, setFrequency, frequency, stockDataCol, classNames, showPagination, setPage, totalPages, hideFrequency } = props;
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState(
        []
    )
    const [searchParams, setSearchParams] = useSearchParams();

    const [columnVisibility, setColumnVisibility] =
        React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})
    const columns = modifiedColumns({ handleDelete, handleData, stockDataCol });
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })
    const length_of_array = totalPages; // Replace with the desired size of your array
    const arrayPage = Array.from({ length: length_of_array }, (_, index) => 1);

    return (
        <div className={cn("w-full", classNames && classNames.root)}>
            <div className="flex items-center py-4 space-x-5">
                {hideKeys &&
                    <>
                        <Input
                            placeholder="Filter stocks..."
                            value={(table.getColumn("symbol")?.getFilterValue()) ?? ""}
                            onChange={(event) =>
                                table.getColumn("symbol")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm rounded-full font-bold border-slate-900"
                        />
                        { hideFrequency ? null : 
                            < Input
                                placeholder="Frequency"
                                value={frequency}
                                onChange={(event) =>
                                    setFrequency(event.target.value)
                                }
                                className="max-w-sm rounded-full font-bold border-slate-900"
                            />}
                    </>}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto rounded-full bg-white text-stone-900 font-bold font-semibold rounded-full gap-2 border-slate-900 hover:bg-slate-500 w-[150px]">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-stone-50">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize bg-white hover:bg-slate-500"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table className="space-y-5">
                    <TableHeader className="bg-slate-900">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="text-white font-bold" key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div>
                {showPagination &&
                    <>
                        <Pagination>
                            <PaginationContent>
                                {arrayPage.map((i, index) => (
                                    <PaginationItem onClick={() => setPage(index + 1)}>
                                        <PaginationLink className="font-black hover:underline text-xl" >{index + 1}</PaginationLink>
                                    </PaginationItem>
                                ))}
                            </PaginationContent>
                        </Pagination>
                    </>
                }
            </div>
        </div>
    )
}


export default DataTableDemo