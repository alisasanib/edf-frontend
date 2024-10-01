import React, { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import useOutsideClick from "../../hooks/useClickOutside";
import CloseIcon from "../../assets/icons/cross-close-svgrepo-com.svg";
import getScrollbarSize from "../../utils/getScrollbarSize";
import styles from "./styles.module.css";

export interface ModalProps {
  visible?: boolean;
  title?: string | React.ReactNode;
  content?: string | React.ReactNode | string[];
  onBgClick?: () => void;
  containerClass?: string;
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = React.memo(({ visible = false, onBgClick, ...props }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const onHide = useCallback(() => {
    if (onBgClick) {
      onBgClick();
    }
  }, [onBgClick]);

  useOutsideClick(modalRef, onHide);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onHide();
      }
    };

    if (visible) {
      window.addEventListener("keydown", handleKeyDown);
      modalRef.current?.focus();
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, onHide]);

  useEffect(() => {
    const width = getScrollbarSize(document);
    document.body.style.overflow = visible ? "hidden" : "";
    document.body.style.paddingRight = visible ? `${width}px` : "0px";

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [visible]);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div
      className={`${styles.Modal_AbsoluteWrapper} ${styles.Modal_Animation} ${styles.Modal_AbsoluteWrapper__shadow} ${styles.Modal_AbsoluteWrapper__shadowActive}`}
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
      aria-describedby='modal-description'>
      <div
        ref={modalRef}
        className={`${styles.Modal}`}>
        {props.title && <h2 id='modal-title'>{props.title}</h2>}
        <div className={styles.Modal_content}>
          {props.content && <div id='modal-description'>{props.content}</div>}
          {props.children}
        </div>
        <button
          aria-label='Close modal'
          data-testid='close-model'
          onClick={onHide}
          className={styles.Modal_close}>
          <img
            width={20}
            src={CloseIcon}
            alt='Close modal'
          />
        </button>
      </div>
    </div>,
    document.body
  );
});

Modal.displayName = "Modal";

export default Modal;
