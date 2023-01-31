/*
 * Copyright (C) 2019-2023 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { useEffect, useState } from "react";

import { ALERT_TYPES, useAlert, useAPIPost, useWSForisModule } from "foris";

import API_URLs from "../API";

export default function useSpeedTest(ws, asyncId, setAsyncId) {
    const [setAlert] = useAlert();
    const [isLoading, setIsLoading] = useState(false);
    const [triggerTest, triggerTestRequest] = useAPIPost(API_URLs.measure);

    useEffect(() => {
        if (triggerTest.data && triggerTest.data.async_id) {
            setAsyncId(triggerTest.data.async_id);
        }
    }, [setAsyncId, triggerTest.data]);

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
            setIsLoading(false);
        }
    }, [asyncId, testFinishedNotification]);

    useEffect(() => {
        if (
            testFinishedNotification &&
            testFinishedNotification.async_id === asyncId
        ) {
            if (testFinishedNotification.passed) {
                setAlert(
                    _("Speed test finished successfully."),
                    ALERT_TYPES.SUCCESS
                );
            } else {
                setAlert(_("Speed test failed."), ALERT_TYPES.DANGER);
            }
        }
    }, [asyncId, setAlert, testFinishedNotification]);

    const onClickHandler = () => {
        triggerTestRequest();
        setIsLoading(true);
    };

    return [onClickHandler, isLoading];
}
