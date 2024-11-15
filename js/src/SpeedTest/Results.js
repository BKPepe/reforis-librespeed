/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect, useState } from "react";

import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    const [isLoading, setIsLoading] = useState(false);

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

    const handleRedownloadData = () => {
        setIsLoading(true);
        getDataRequest();

        setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <div className="card p-4 col-sm-12 col-lg-12 mb-0">
            <h2 className="d-flex justify-content-between align-items-center">
                {_("Results")}
                <Button
                    id="redownload-data-button"
                    className="btn-sm btn-outline-primary"
                    disabled={buttonIsDisabled}
                    onClick={handleRedownloadData}
                >
                    <FontAwesomeIcon
                        icon={faSyncAlt}
                        className={`me-1 ${isLoading ? "fa-spin" : ""}`}
                    />
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
