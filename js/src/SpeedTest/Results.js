/*
 * Copyright (C) 2019-2023 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect } from "react";

import { Button, useAPIGet, useWSForisModule } from "foris";
import PropTypes from "prop-types";

import ResultsTableWithErrorAndSpinner from "./ResultsTable";
import API_URLs from "../API";

Results.propTypes = {
    ws: PropTypes.object.isRequired,
    asyncId: PropTypes.string,
};

function Results({ ws, asyncId }) {
    const [getDataState, getDataRequest] = useAPIGet(API_URLs.data);

    useEffect(() => {
        getDataRequest();
    }, [getDataRequest]);

    const [testFinishedNotification] = useWSForisModule(
        ws,
        "librespeed",
        "measure"
    );

    useEffect(() => {
        if (
            testFinishedNotification &&
            testFinishedNotification.async_id === asyncId
        ) {
            if (testFinishedNotification.passed) {
                getDataRequest();
            }
        }
    }, [asyncId, getDataRequest, testFinishedNotification]);

    const buttonIsDisabled = getDataState.state !== "success";

    return (
        <div className="card p-4 col-sm-12 col-lg-12 mb-4">
            <h2>
                {_("Results")}
                <Button
                    id="redownload-data-button"
                    className="btn btn-outline-primary float-end"
                    loading={buttonIsDisabled}
                    disabled={buttonIsDisabled}
                    onClick={getDataRequest}
                >
                    {_("Refresh")}
                </Button>
            </h2>
            <ResultsTableWithErrorAndSpinner
                apiState={getDataState.state}
                performed_tests={(getDataState.data || {}).performed_tests}
            />
        </div>
    );
}

export default Results;
