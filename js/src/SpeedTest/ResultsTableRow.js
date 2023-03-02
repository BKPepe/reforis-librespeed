/*
 * Copyright (C) 2019-2023 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import moment from "moment";
import PropTypes from "prop-types";

ResultsTableRow.propTypes = {
    test: PropTypes.shape({
        server: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        speed_download: PropTypes.number.isRequired,
        speed_upload: PropTypes.number.isRequired,
        jitter: PropTypes.number.isRequired,
        ping: PropTypes.number.isRequired,
    }).isRequired,
};

export default function ResultsTableRow({ test }) {
    const {
        server,
        time,
        speed_download: download,
        speed_upload: upload,
        jitter,
        ping,
    } = test;

    const formatedTime = moment(time)
        .locale(ForisTranslations.locale)
        .format("l LT");

    return (
        <tr>
            <td>{server}</td>
            <td className="text-center">{formatedTime}</td>
            <td className="text-center">{download}</td>
            <td className="text-center">{upload}</td>
            <td className="text-center">{jitter}</td>
            <td className="text-right">{ping}</td>
        </tr>
    );
}
