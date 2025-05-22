"use client";

import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useState } from "react";

import type { LayerInfo } from "@/models";

import Styles from "./information_icon.module.css";

type Props = {
  layer: LayerInfo;
};

export function InformationIcon({ layer }: Props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <span
        className={classNames("icon", Styles.Icon)}
        onClick={() => setShowModal(true)}
      >
        <FontAwesomeIcon icon={faCircleInfo} />
      </span>
      <div className={classNames("modal", { "is-active": showModal })}>
        <div className="modal-background" onClick={() => setShowModal(false)} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Layer Info</p>
          </header>
          <section className="modal-card-body">
            <pre>{JSON.stringify(layer, null, 4)}</pre>
          </section>
          <footer className="modal-card-foot"></footer>
        </div>
      </div>
    </>
  );
}
