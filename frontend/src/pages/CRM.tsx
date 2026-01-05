import React from "react";
import {
  ColumnDef,
  RowSelectionState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, setSelectedIds, Contact } from "../slices/crmSlice";
import { AppDispatch, RootState } from "../store";
import TableActionsHeader from "../components/TableActionsHeader";
import SearchTable from "../components/SearchTable";

export default function CRM() {
  const dispatch = useDispatch<AppDispatch>();
  const { contacts } = useSelector((s: RootState) => s.crm);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  useEffect(() => {
    const ids = Object.keys(rowSelection)
      .filter((k) => rowSelection[k])
      .map(Number);

    dispatch(setSelectedIds(ids));
  }, [rowSelection]);

  const columns = useMemo<ColumnDef<Contact>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "company_name", header: "Company" },
      { accessorKey: "location", header: "Location" },
      { accessorKey: "industry", header: "Industry" },
      { accessorKey: "last_contacted", header: "Last Contacted" },
      { accessorKey: "next_contacted", header: "Next Contacted" },
      { accessorKey: "emails_sent", header: "# Sent" },
      { accessorKey: "emails_scheduled", header: "# Scheduled" },
    ],
    []
  );

  const table = useReactTable({
    data: contacts,
    columns,
    state: { rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border border-slate-400 rounded-lg min-h-screen uppercase text-sm">
      <div>
        <TableActionsHeader />
      </div>
      <div>
        <SearchTable />
      </div>
      <table className="w-full border-collapse">
        <thead className="border-b border-slate-400">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th
                  key={h.id}
                  className="px-4 py-3 text-left font-medium text-slate-700"
                >
                  {h.isPlaceholder
                    ? null
                    : (h.column.columnDef.header as string)}{" "}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-slate-300 last:border-b-0"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 text-slate-800">
                  {cell.getValue() as string}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
