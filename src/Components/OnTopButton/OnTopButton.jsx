import styles from "./OnTopButton.module.scss";
import classNames from 'classnames/bind';
import React, { useState, useEffect } from 'react';
import { FaChevronUp } from "react-icons/fa";

const cx = classNames.bind(styles);

const OnTopButton = () => {
    const [onTop, setOnTop] = useState(false);
    const haneleScroll = () => {
        const show = document.documentElement.scrollTop;
        if (show > 300) {
            setOnTop(true);
        } else {
            setOnTop(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", haneleScroll);
    }, []);

    return (
        <div className={cx("wrapper")}>
            {onTop && (
                <a href="#" className={cx("onTop")}>
                    <FaChevronUp className={cx("iconTop")} />
                </a>
            )}
        </div>
    );
};

export default OnTopButton;