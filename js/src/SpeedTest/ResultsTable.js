/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { withErrorMessage, withSpinnerOnSending, RichTable } from "foris";
import moment from "moment";
import PropTypes from "prop-types";

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

    const columns = [
        {
            accessorKey: "server",
            header: _("Server"),
        },
        {
            accessorKey: "time",
            header: _("Date and time"),
            // Keep the raw ISO timestamp as the cell value so the column is
            // sorted chronologically; only format it for display.
            cell: ({ getValue }) => localizedFormattedTime(getValue()),
            sortingFn: (rowA, rowB, columnId) =>
                new Date(rowA.getValue(columnId)) -
                new Date(rowB.getValue(columnId)),
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
    ];

    const data = tests
        .map((test) => ({
            server: test.server,
            time: test.time,
            speed_download: test.speed_download,
            speed_upload: test.speed_upload,
            jitter: test.jitter,
            ping: test.ping,
        }))
        .sort((a, b) => new Date(b.time) - new Date(a.time));

    return tests.length > 0 ? (
        <RichTable columns={columns} data={data} withPagination />
    ) : (
        <p className="text-muted text-center mb-0">
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
