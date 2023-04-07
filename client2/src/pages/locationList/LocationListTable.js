import React, { useState, useEffect } from "react";
import { useTable, useExpanded, useRowSelect } from "react-table";
import styled from "styled-components";
import LocationFormEdit from "./LocationFormEdit.js";
import LocationFormAdd from "./LocationFormAdd.js";

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHeader = styled.th`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  font-weight: bold;
  padding: 8px;
  text-align: left;
`;

const TableRow = styled.tr`
  background-color: ${({ selected }) => (selected ? "#e6f7ff" : "transparent")};
  border: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const MyTable = ({ data, onUpdateSelectedRows }) => {
  const columns = React.useMemo(
    () => [
      { Header: "Site Location", accessor: "Site_x0020_Location" },
      { Header: "Serial", accessor: "Serial" },
      { Header: "System Type", accessor: "System_x0020_Type" },

      { Header: "Equip Threat", accessor: "Equip_x002f_Threat" },
      { Header: "Range", accessor: "Range" },
      {
        Header: "Lat/Lon (DMS)",
        accessor: "Lat_x002f_Lon_x0020__x0028_DMS_x",
      },
      { Header: "Elevation", accessor: "Elevation" },
      {
        Header: "Bullseye (MIZZI)",
        accessor: "Bullseye_x0020__x0028_MIZZI_x002",
      },
      { Header: "Accuracy", accessor: "Accuracy" },
      { Header: "Status", accessor: "Status" },
      { Header: "ETIC", accessor: "ETIC" },
      { Header: "Information", accessor: "Information" },
      { Header: "Schedulable", accessor: "Schedulable" },
      { Header: "Availability", accessor: "Availability" },
      { Header: "Operational", accessor: "Operational" },

      // { Header: "Title", accessor: "Title" },
      // { Header: "Lon_x0020_DD", accessor: "Lon_x0020_DD" },
      // { Header: "Lat_x0020_DD", accessor: "Lat_x0020_DD" },
      // { Header: "Coord_x0020_Source", accessor: "Coord_x0020_Source" },
      // { Header: "Latitude", accessor: "Latitude" },
      // { Header: "Longitude", accessor: "Longitude" },
      // {
      //   Header: "Coord_x0020_Recorded_x0020_Date",
      //   accessor: "Coord_x0020_Recorded_x0020_Date",
      // },
      // { Header: "Notes", accessor: "Notes" },
      // { Header: "Remarks", accessor: "Remarks" },
      // {
      //   Header: "Status_x0020_change_x0020_date",
      //   accessor: "Status_x0020_change_x0020_date",
      // },
      // { Header: "ID", accessor: "ID" },
      // { Header: "Modified", accessor: "Modified" },
      // { Header: "Created", accessor: "Created", show: false },
      // { Header: "Equipment", accessor: "Equipment" },
      // { Header: "Threat", accessor: "Threat" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },

    useExpanded,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          // Build our expander column
          id: "expander", // Make sure it has an ID
          Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
            <span {...getToggleAllRowsExpandedProps()}>
              {isAllRowsExpanded ? "👇" : "👉"}
            </span>
          ),
          Cell: ({ row }) =>
            // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
            // to build the toggle for expanding a row
            !row.canExpand ? (
              <span
                {...row.getToggleRowExpandedProps({
                  style: {
                    // We can even use the row.depth property
                    // and paddingLeft to indicate the depth
                    // of the row
                    paddingLeft: `${row.depth * 2}rem`,
                  },
                })}
              >
                {row.isExpanded ? "👇" : "👉"}
              </span>
            ) : null,
        },
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          ),
        },
        {
          id: "edit",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <LocationFormAdd/>
          ),
          Cell: ({ row }) => (
            <LocationFormEdit/>
          ),
        },
        ...columns,

        ///edit
        //delete
      ]);
    }
  );

  React.useEffect(() => {
    if(selectedFlatRows.length > 0 && selectedFlatRows){
      const test = selectedFlatRows.map(data => data.original)
      console.log(test)
      onUpdateSelectedRows(test);
    }
    
  }, [selectedFlatRows]);

  return (
    <TableContainer>
      
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableHeader>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <>
                <TableRow
                  {...row.getRowProps({
                    onClick: () => row.toggleRowSelected(),
                  })}
                  selected={row.isSelected}
                >
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
                {row.isExpanded ? (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ display: "box", widows: '100%'}}>
                          <div>Title: {row.original.Title}</div>
                          <div>
                            Lat/Lon DD: {row.original.Lat_x0020_DD},{" "}
                            {row.original.Lon_x0020_DD}
                          </div>
                          <div>
                            Lat/Lon: {row.original.Latitude},{" "}
                            {row.original.Longitude}
                          </div>
                        </div>
                        <div style={{ display: "box", }}>
                          <div>{row.original.Coord_x0020_Source}</div>
                          <div>
                            {row.original.Coord_x0020_Recorded_x0020_Date}
                          </div>
                        </div>

                        <div style={{ display: "box", }}>
                          <div>Notes: {row.original.Notes}</div>
                        </div>
                        <div style={{ display: "box", }}>
                          <div>Remarks: {row.original.Remarks}</div>
                        </div>
                        <div style={{ display: "box" }}>
                          <div>
                            Status Change Date:{" "}
                            {row.original.Status_x0020_change_x0020_date}
                          </div>
                          <div>Modified:{row.original.Modified}</div>
                          <div>Created: {row.original.Created}</div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : null}
              </>
            );
          })}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
