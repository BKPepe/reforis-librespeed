/*
 * Copyright (C) 2019-2023 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useState } from "react";

import PropTypes from "prop-types";

import useSpeedTest from "./hooks";
import Results from "./Results";
import SpeedTestButton from "./SpeedTestButton";
import SpeedTestProgress from "./SpeedTestProgress";
import LibreSpeed from "../LibreSpeed";

SpeedTest.propTypes = {
    ws: PropTypes.object.isRequired,
};

export default function SpeedTest({ ws }) {
    const [testAsyncId, setTestAsyncId] = useState(null);
    const [onClickHandler, isLoading] = useSpeedTest(
        ws,
        testAsyncId,
        setTestAsyncId
    );

    return (
        <LibreSpeed>
            <div className="card p-4 col-sm-12 col-lg-12 mb-4">
                <h2>{_("Speed Test")}</h2>
                <div className="d-flex flex-column flex-sm-row gap-2">
                    <SpeedTestButton
                        onClickHandler={onClickHandler}
                        isLoading={isLoading}
                    />
                    <SpeedTestProgress isLoading={isLoading} />
                </div>
            </div>
            <Results ws={ws} asyncId={testAsyncId} />
        </LibreSpeed>
    );
}
