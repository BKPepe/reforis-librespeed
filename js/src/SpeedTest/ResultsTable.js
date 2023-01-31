/*
 * Copyright (C) 2019-2023 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";
import { withErrorMessage, withSpinnerOnSending } from "foris";

import ResultsTableRow from "./ResultsTableRow";

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
    return tests.length ? (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">{_("Server")}</th>
                        <th scope="col" className="text-center">
                            {_("Date and Time")}
                        </th>
                        <th scope="col" className="text-center">
                            {_("Download [Mb/s]")}
                        </th>
                        <th scope="col" className="text-center">
                            {_("Upload [Mb/s]")}
                        </th>
                        <th scope="col" className="text-center">
                            {_("Jitter [ms]")}
                        </th>
                        <th scope="col" className="text-right">
                            {_("Ping [ms]")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tests
                        .sort((a, b) => b.time.localeCompare(a.time))
                        .map((test) => (
                            <ResultsTableRow key={test.time} test={test} />
                        ))}
                </tbody>
            </table>
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
