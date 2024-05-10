import { User } from "@/pages/Users";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ScrollArea } from "../ui/scroll-area";

interface DataTableProps<TData> {
  data: TData[];
}

export function WagesTable<TData>({ data }: DataTableProps<TData>) {
  const columns: ColumnDef<TData>[] = [
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ cell }) =>
        typeof cell.getValue() === "number"
          ? (cell.getValue() as number).toLocaleString()
          : cell.getValue(),
    },
    {
      accessorKey: "currency",
      header: "Currency",
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            key={headerGroup.id}
            className="hover:bg-transparent flex justify-between"
          >
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <ScrollArea>
        <TableBody className="overflow-y-auto block h-[300px]">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`flex justify-between ${
                  (row.getValue("amount") as number) < 0
                    ? "bg-blueSecondary hover:bg-blueSecondaryHover"
                    : ""
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <>
                    <TableCell key={cell.id} className="">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  </>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </ScrollArea>
    </Table>
  );
}
