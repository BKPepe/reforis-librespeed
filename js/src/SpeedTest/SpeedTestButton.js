/*
 * Copyright (C) 2019-2023 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { Button } from "foris";
import PropTypes from "prop-types";

StartTestButton.propTypes = {
    onClickHandler: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

export default function StartTestButton({ onClickHandler, isLoading }) {
    return (
        <Button
            id="start-test-button"
            className="btn btn-primary"
            loading={isLoading}
            disabled={isLoading}
            onClick={onClickHandler}
            style={{ minWidth: "160px" }}
        >
            {_("Start")}
        </Button>
    );
}
