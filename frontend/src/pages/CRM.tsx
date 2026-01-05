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
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th key={h.id}>
                  {h.isPlaceholder
                    ? null
                    : (h.column.columnDef.header as string)}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.getValue() as string}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
