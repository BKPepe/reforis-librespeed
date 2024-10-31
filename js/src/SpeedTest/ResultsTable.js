/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useMemo, useState } from "react";

import { withErrorMessage, withSpinnerOnSending } from "foris";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquareCaretUp,
    faSquareCaretDown,
    faAngleLeft,
    faAnglesLeft,
    faAngleRight,
    faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import PropTypes from "prop-types";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

ResultsTable.propTypes = {
    performed_tests: PropTypes.arrayOf(
        PropTypes.shape({
            time: PropTypes.string.isRequired,
            speed_download: PropTypes.number.isRequired,
            speed_upload: PropTypes.number.isRequired,
            jitter: PropTypes.number.isRequired,
            ping: PropTypes.number,
        })
    ).isRequired,
};

function ResultsTable({ performed_tests: tests }) {
    const localizedFormattedTime = (time) =>
        moment(time).locale(ForisTranslations.locale).format("l LT");
    const [sorting, setSorting] = useState([]);

    const columns = useMemo(
        () => [
            {
                accessorKey: "server",
                header: _("Server"),
            },
            {
                accessorKey: "time",
                header: _("Date and time"),
            },
            {
                accessorKey: "speed_download",
                header: _("Download [Mb/s]"),
            },
            {
                accessorKey: "speed_upload",
                header: _("Upload [Mb/s]"),
            },
            {
                accessorKey: "jitter",
                header: _("Jitter [ms]"),
            },
            {
                accessorKey: "ping",
                header: _("Ping [ms]"),
            },
        ],
        []
    );

    const [data, setData] = useState(
        tests
            .map((test) => ({
                server: test.server,
                time: localizedFormattedTime(test.time),
                speed_download: test.speed_download,
                speed_upload: test.speed_upload,
                jitter: test.jitter,
                ping: test.ping,
            }))
            .sort((a, b) => new Date(b.time) - new Date(a.time))
    );

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        state: {
            sorting,
            pagination,
        },
    });

    const prevPagBtnDisabled = !table.getCanPreviousPage();
    const nextPagBtnDisabled = !table.getCanNextPage();
    return tests.length > 0 ? (
        <div className="table-responsive">
            <table className="table table-hover text-nowrap">
                <thead className="thead-light">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <button
                                                className={`btn btn-link text-decoration-none text-reset fw-bold p-0 d-flex align-items-center
                                                    ${
                                                        header.column.getCanSort()
                                                            ? "d-flex align-items-center"
                                                            : ""
                                                    }
                                                `}
                                                onClick={header.column.getToggleSortingHandler()}
                                                title={
                                                    header.column.getCanSort()
                                                        ? header.column.getNextSortingOrder() ===
                                                          "asc"
                                                            ? _(
                                                                  "Sort ascending"
                                                              )
                                                            : header.column.getNextSortingOrder() ===
                                                                "desc"
                                                              ? _(
                                                                    "Sort descending"
                                                                )
                                                              : _("Clear sort")
                                                        : undefined
                                                }
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: (
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faSquareCaretUp
                                                            }
                                                            className="ms-1 text-primary"
                                                        />
                                                    ),
                                                    desc: (
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faSquareCaretDown
                                                            }
                                                            className="ms-1 text-primary"
                                                        />
                                                    ),
                                                }[
                                                    header.column.getIsSorted()
                                                ] ?? null}
                                            </button>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <nav
                aria-label={_("Pagination navigation bar")}
                className="d-flex gap-2 justify-content-start align-items-center mx-2 mb-1 text-nowrap"
            >
                <ul className="pagination pagination-sm mb-0">
                    <li
                        className={`page-item ${prevPagBtnDisabled ? "disabled" : ""}`.trim()}
                        style={
                            prevPagBtnDisabled
                                ? { cursor: "not-allowed" }
                                : { cursor: "pointer" }
                        }
                    >
                        <button
                            className="page-link"
                            aria-label={_("First page")}
                            onClick={() => table.firstPage()}
                            disabled={prevPagBtnDisabled}
                        >
                            <FontAwesomeIcon icon={faAnglesLeft} />
                        </button>
                    </li>
                    <li
                        className={`page-item ${prevPagBtnDisabled ? "disabled" : ""}`.trim()}
                        style={
                            prevPagBtnDisabled
                                ? { cursor: "not-allowed" }
                                : { cursor: "pointer" }
                        }
                    >
                        <button
                            className="page-link"
                            aria-label={_("Previous page")}
                            onClick={() => table.previousPage()}
                            disabled={prevPagBtnDisabled}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                    </li>
                    <li
                        className={`page-item ${nextPagBtnDisabled ? "disabled" : ""}`.trim()}
                        style={
                            nextPagBtnDisabled
                                ? { cursor: "not-allowed" }
                                : { cursor: "pointer" }
                        }
                    >
                        <button
                            className="page-link"
                            aria-label={_("Next page")}
                            onClick={() => table.nextPage()}
                            disabled={nextPagBtnDisabled}
                        >
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </li>
                    <li
                        className={`page-item ${nextPagBtnDisabled ? "disabled" : ""}`.trim()}
                        style={
                            nextPagBtnDisabled
                                ? { cursor: "not-allowed" }
                                : { cursor: "pointer" }
                        }
                    >
                        <button
                            className="page-link"
                            aria-label={_("Last page")}
                            onClick={() => table.lastPage()}
                            disabled={nextPagBtnDisabled}
                        >
                            <FontAwesomeIcon icon={faAnglesRight} />
                        </button>
                    </li>
                </ul>
                <span>
                    {_("Page")}&nbsp;
                    <span className="fw-bold">
                        {table.getState().pagination.pageIndex + 1}
                        &nbsp;{_("of")}&nbsp;
                        {table.getPageCount().toLocaleString()}
                    </span>
                </span>
                <div
                    className="vr mx-1 align-self-center"
                    style={{ height: "1.5rem" }}
                />
                <span>
                    {_("Go to page:")}
                    <div className="d-inline-block ms-1 input-group input-group-sm w-auto">
                        <input
                            type="number"
                            min="1"
                            max={table.getPageCount()}
                            defaultValue={
                                table.getState().pagination.pageIndex + 1
                            }
                            onChange={(e) => {
                                const page = e.target.value
                                    ? Number(e.target.value) - 1
                                    : 0;
                                table.setPageIndex(page);
                            }}
                            className="form-control w-auto"
                            aria-label={_("Page number")}
                        />
                    </div>
                </span>
                <select
                    className="form-select form-select-sm w-auto"
                    aria-label={_("Select page size")}
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {_("Show")} {pageSize}
                        </option>
                    ))}
                </select>
            </nav>
        </div>
    ) : (
        <p className="text-muted text-center py-2">
            {_(
                "No tests have been performed lately. Try to start a new test or re-download data."
            )}
        </p>
    );
}

const ResultsTableWithErrorAndSpinner = withSpinnerOnSending(
    withErrorMessage(ResultsTable)
);

export default ResultsTableWithErrorAndSpinner;
