"use client";

import {
  faClipboardCheck,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useState } from "react";

import Styles from "./clipboard_icon.module.css";

type Props = {
  value: string;
};

const INTERVAL = 1.75 * 1000;

export function ClipboardIcon({ value }: Props) {
  const [copied, setCopied] = useState(false);

  const icon = copied ? faClipboardCheck : faClipboardList;

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), INTERVAL);
  }
  return (
    <span className={classNames("icon", Styles.ClipboardIcon)} onClick={copy}>
      <FontAwesomeIcon icon={icon} />
    </span>
  );
}
